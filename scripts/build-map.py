"""Rebuild the presentation SVG from the bundled official IBGE GeoJSON."""
from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'client/public/maps/brasil-estados.geojson').read_text(encoding='utf-8'))
def project(c):
    return [35 + (c[0] + 74) * 12.25, 20 + (6 - c[1]) * 12.5]
states = []
for feature in data['features']:
    geometry = feature['geometry']
    polygons = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    paths = []
    for polygon in polygons:
        for ring in polygon:
            if len(ring) < 3:
                continue
            points = [project(c) for c in ring]
            paths.append('M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in points) + ' Z')
    states.append({'id': str(feature['properties'].get('codarea', '')), 'path': ' '.join(paths)})
output = '// Generated from IBGE state boundaries by scripts/build-map.py.\nexport const brazilStates=' + json.dumps(states, separators=(',', ':')) + ';\nexport const serraPoint=' + json.dumps(project([-40.307, -20.128])) + ';\n'
(root / 'client/src/lib/map-data.ts').write_text(output, encoding='utf-8')
