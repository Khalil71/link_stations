/**
 * Objective:
 *  Create a function that solves the most suitable (with most power) link station for a device at given point [x,y]
 */

// Print out function output from points​ (x, y):
const points = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18],
];

//Get the best link station (if any) for each point and printout the results
points.map(getBestStation).map((result) => {
  if (result.bestStation) {
    console.log(
      `Best link station for point [${result.point[0]},${
        result.point[1]
      }] is [${
        result.bestStation[0]
      }] with power: ${result.bestStation[2].toFixed(2)}`
    );
  } else {
    console.log(
      `No link station within reach for point [${result.point[0]},${result.point[1]}]`
    );
  }
});

/**
 * Get the best link station for a given coordinate point
 * [[x, y], r]
 * @param point
 * @returns {object}
 */
function getBestStation(point) {
  const stations = [
    [[0, 0], 10],
    [[20, 20], 5],
    [[10, 0], 12],
  ];

  let bestStation = stations
    .map((station) => {
      station[2] = getPower(getDistance(point, station[0]), station[1]);
      return station;
    })
    .filter((station) => station[2] > 0)
    .sort((station1, station2) => station2[2] - station1[2])[0]; //return only the link station with the best connection

  return {
    point,
    bestStation,
  };
}

/**
 * Calculate the distance between two coordinates
 * formula: sqrt( (x2 − x1)pow2 + (y2 − y1)pow2 )
 * @param array point1 [x,y]
 * @param array point2 [x,y]
 * @returns {number}
 */
function getDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(Math.abs(point1[0] - point2[0]), 2) +
      Math.pow(Math.abs(point1[1] - point2[1]), 2)
  );
}
/**
 * Calculate the power of link station from a given distance
 * @param distance from the link station
 * @param reach of the link station
 * @returns {number}
 */
function getPower(distance, reach) {
  return distance > reach ? 0 : Math.pow(reach - distance, 2);
}
