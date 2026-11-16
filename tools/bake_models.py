#!/usr/bin/env python3
"""
LivingWild Wiki - re-hornea los modelos 3D desde el mod.

Uso:   python3 tools/bake_models.py <carpeta_del_mod> [<carpeta_de_la_wiki>]
Ej.:   python3 tools/bake_models.py ../livingwild .

Lee   <mod>/src/main/resources/assets/mundovivo/geckolib/models/**/*.geo.json  y sus texturas PNG
Escribe <wiki>/models/*.js  (los que carga viewer.js).
Ejecutalo cada vez que cambies un modelo o textura del mod, asi la wiki nunca queda desactualizada.
Requiere Python 3 + Pillow (pip install pillow).
"""
import json, math, base64, sys, os, io
from PIL import Image

def rot_mat(rx, ry, rz):
    # GeckoLib/Blockbench: orden ZYX (se aplica X, luego Y, luego Z). Angulos en grados (bedrock).
    rx, ry, rz = map(math.radians, (rx, ry, rz))
    cx, sx = math.cos(rx), math.sin(rx); cy, sy = math.cos(ry), math.sin(ry); cz, sz = math.cos(rz), math.sin(rz)
    X = [[1,0,0],[0,cx,-sx],[0,sx,cx]]
    Y = [[cy,0,sy],[0,1,0],[-sy,0,cy]]
    Z = [[cz,-sz,0],[sz,cz,0],[0,0,1]]
    return mm(Z, mm(Y, X))
def mm(a,b): return [[sum(a[i][k]*b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
def mv(m,v): return [sum(m[i][k]*v[k] for k in range(3)) for i in range(3)]

def bone_chain(bones):
    by = {b['name']: b for b in bones}
    cache = {}
    def chain(name):
        if name in cache: return cache[name]
        b = by[name]; p = b.get('parent')
        cache[name] = (chain(p) if p and p in by else []) + [b]
        return cache[name]
    return chain

import re
HIDE=re.compile(r'^(ember_\d+|fireball.*|FX_.*)$')
def bake(geo_path, sign=(1,1,1), rotsign=(-1,-1,1)):
    g = json.load(open(geo_path))['minecraft:geometry'][0]
    W = g['description']['texture_width']; H = g['description']['texture_height']
    chain = bone_chain(g['bones'])
    quads = []
    for b in g['bones']:
        cubes = b.get('cubes') or []
        if not cubes: continue
        ch = chain(b['name'])
        if any(HIDE.match(x['name']) for x in ch): continue
        for c in cubes:
            ox, oy, oz = c['origin']; sx, sy, sz = c['size']; inf = c.get('inflate', b.get('inflate', 0)) or 0
            x0, y0, z0 = ox-inf, oy-inf, oz-inf; x1, y1, z1 = ox+sx+inf, oy+sy+inf, oz+sz+inf
            # caras: (nombre, 4 vertices TL,TR,BR,BL vistos desde fuera)
            faces = {
              'north': [(x1,y1,z0),(x0,y1,z0),(x0,y0,z0),(x1,y0,z0)],
              'south': [(x0,y1,z1),(x1,y1,z1),(x1,y0,z1),(x0,y0,z1)],
              'east':  [(x1,y1,z1),(x1,y1,z0),(x1,y0,z0),(x1,y0,z1)],
              'west':  [(x0,y1,z0),(x0,y1,z1),(x0,y0,z1),(x0,y0,z0)],
              'up':    [(x0,y1,z0),(x1,y1,z0),(x1,y1,z1),(x0,y1,z1)],
              'down':  [(x0,y0,z1),(x1,y0,z1),(x1,y0,z0),(x0,y0,z0)],
            }
            uv = c.get('uv'); d = [sx, sy, sz]
            for name in ['north','south','east','west','up','down']:
                if isinstance(uv, dict):
                    if name not in uv: continue
                    f = uv[name]; u, v = f['uv']; uw, vh = f['uv_size']
                else:
                    u0, v0 = uv; w, h, dd = sx, sy, sz
                    reg = {'east':(u0,v0+dd,dd,h),'north':(u0+dd,v0+dd,w,h),'west':(u0+dd+w,v0+dd,dd,h),
                           'south':(u0+dd+w+dd,v0+dd,w,h),'up':(u0+dd,v0,w,dd),'down':(u0+dd+w,v0,w,dd)}[name]
                    u, v, uw, vh = reg
                    if name == 'down': pass
                # esquinas uv TL,TR,BR,BL
                corners = [(u,v),(u+uw,v),(u+uw,v+vh),(u,v+vh)]
                verts = []
                for (px,py,pz),(cu,cv) in zip(faces[name], corners):
                    p = [px,py,pz]
                    # rotacion propia del cubo
                    if c.get('rotation'):
                        piv = c.get('pivot', [0,0,0]); R = rot_mat(*[a*s for a,s in zip(c['rotation'], rotsign)])
                        p = [a+b_ for a,b_ in zip(mv(R,[p[i]-piv[i] for i in range(3)]), piv)]
                    # huesos de hijo a raiz
                    for bb in reversed(ch):
                        if bb.get('rotation'):
                            piv = bb.get('pivot',[0,0,0]); R = rot_mat(*[a*s for a,s in zip(bb['rotation'], rotsign)])
                            p = [a+b_ for a,b_ in zip(mv(R,[p[i]-piv[i] for i in range(3)]), piv)]
                    verts += [round(p[0]*sign[0],4), round(p[1]*sign[1],4), round(p[2]*sign[2],4), round(cu/W,4), round(cv/H,4)]
                quads.append(verts)
    return quads, W, H

def pack(quads):
    flat = []
    for q in quads: flat += q
    return flat

def write_js(name, quads, tex_path, out_dir, atlas_max=None):
    im = Image.open(tex_path).convert('RGBA')
    buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
    data = 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
    def fmt(x):
        s = ('%.4f' % x).rstrip('0').rstrip('.')
        return '0' if s in ('-0','') else s
    qs = ','.join(fmt(x) for x in pack(quads))
    js = 'window.LW3D&&LW3D.reg(%s,{"q":[%s],"t":"%s"});' % (json.dumps(name), qs, data)
    open(os.path.join(out_dir, name + '.js'), 'w').write(js)
    return len(js)

if __name__=='__main__':
    import sys
    MOD=sys.argv[1] if len(sys.argv)>1 else '../livingwild'
    WIKI=sys.argv[2] if len(sys.argv)>2 else '.'
    R=os.path.join(MOD,'src/main/resources/assets/mundovivo')+'/'
    OUT=os.path.join(WIKI,'models'); os.makedirs(OUT,exist_ok=True)
    dragons={'fire':'fire','ice':'ice','earth':'earth','wind':'wind','magma':'magma','solar':'solar','blizzard':'ventisca','crystal':'cristal'}
    M={}
    for en,es in dragons.items():
        M[f'{en}-dragon']=(f'entity/dragon_{es}',f'textures/entity/dragon_{es}.png')
        M[f'baby-{en}-dragon']=(f'entity/baby_dragon_{es}',f'textures/entity/baby_dragon_{es}.png')
    for en in ['fire','ice','earth','wind']:
        M[f'{en}-dragon-egg']=(f'block/egg_{en}',f'textures/block/egg_{en}.png')
    M.update({
     'dragoso':('entity/dragoso','textures/entity/dragoso.png'),
     'glacial-boss':('entity/boss_glacial','textures/entity/boss_glacial.png'),
     'burly-pig':('entity/cerdo_fornido','textures/entity/cerdo_fornido.png'),
     'playstation-staff-ogre':('entity/ogro_playstation','textures/entity/ogro_playstation.png'),
     'fish-faced-orangutan':('entity/orangutan_pez','textures/entity/orangutan_pez.png'),
     'dragonized-skeleton-hound':('entity/perro_esqueleto_dragon','textures/entity/perro_esqueleto_dragon.png'),
     'humanoid-toucan':('entity/tucan_humanoide','textures/entity/tucan_humanoide.png'),
     'dawnblade':('item/dawn_blade','textures/item/dawn_blade.png'),
     'stormaxe':('item/storm_axe','textures/item/storm_axe.png'),
     'arcane-staff':('item/arcane_staff','textures/item/arcane_staff.png'),
     'petronite-pickaxe':('item/pico_de_petronita','textures/item/pico_de_petronita_3d.png'),
     'fairy-heart':('item/corazon_de_hada','textures/item/corazon_de_hada_3d.png'),
     'dragon-wings':('armor/dragon_wings','textures/models/armor/dragon_wings.png'),
     'petronite-armor':('armor/ice_armor','textures/models/armor/ice_armor.png'),
     'void-armor':('armor/void_armor','textures/models/armor/void_armor.png'),
    })
    for n,(g,t) in M.items():
        q,W,H=bake(R+'geckolib/models/'+g+'.geo.json')
        sz=write_js(n,q,R+t,OUT)
        print(f'{n:28s} {len(q):5d} quads  {sz//1024} KB')
    print('Listo ->',OUT)
