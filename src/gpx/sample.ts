export const testRoute = {
  distance: '0.3 km',
  name: 'Route Relay Test',
  pointCount: 4,
} as const;

export const testRouteGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Route Relay" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Route Relay Test</name>
  </metadata>
  <trk>
    <name>Route Relay Test</name>
    <trkseg>
      <trkpt lat="53.34955" lon="-1.81578"><ele>284.0</ele></trkpt>
      <trkpt lat="53.35011" lon="-1.81442"><ele>287.0</ele></trkpt>
      <trkpt lat="53.35077" lon="-1.81291"><ele>291.0</ele></trkpt>
      <trkpt lat="53.35142" lon="-1.81163"><ele>295.0</ele></trkpt>
    </trkseg>
  </trk>
</gpx>
`;
