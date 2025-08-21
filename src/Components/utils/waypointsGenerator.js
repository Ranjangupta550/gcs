import * as turf from '@turf/turf';

export function generateGridWaypoints(geofenceData, altitude, horizontalFov) {
  if (!geofenceData) throw new Error("No geofence data provided");

  const polygon = turf.polygon(geofenceData.geometry.coordinates);
  const bbox = turf.bbox(polygon);

  const fovRadians = (horizontalFov * Math.PI) / 180;
  const groundWidth = 2 * altitude * Math.tan(fovRadians / 2);
  const subSquareSize = groundWidth * 0.8;

  const width = turf.distance([bbox[0], bbox[1]], [bbox[2], bbox[1]], { units: 'meters' });
  const height = turf.distance([bbox[0], bbox[1]], [bbox[0], bbox[3]], { units: 'meters' });

  const cols = Math.ceil(width / subSquareSize);
  const rows = Math.ceil(height / subSquareSize);

  const lngStep = (bbox[2] - bbox[0]) / cols;
  const latStep = (bbox[3] - bbox[1]) / rows;

  const generatedWaypoints = [];

  for (let row = 0; row < rows; row++) {
    const currentLat = bbox[1] + (row * latStep) + (latStep / 2);
    const colStart = row % 2 === 0 ? 0 : cols - 1;
    const colEnd = row % 2 === 0 ? cols : -1;
    const colStep = row % 2 === 0 ? 1 : -1;

    for (let col = colStart; col !== colEnd; col += colStep) {
      const currentLng = bbox[0] + (col * lngStep) + (lngStep / 2);
      const point = turf.point([currentLng, currentLat]);
      if (turf.booleanPointInPolygon(point, polygon)) {
        generatedWaypoints.push([currentLng, currentLat]);
      }
    }
  }

  return generatedWaypoints;
}
