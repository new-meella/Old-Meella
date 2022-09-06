export const meellaPercent = 0.05;
export const gbPercent = 0.15;
export const storePercent = 0.8;
export const DEVMODE = true;
export const userCoordinate = "13.736705, 100.533205".split(",");

export function distanceStore(
  //? var storeCoordinate = fullRes[i].storeObject.coordinate.split(",");
  /* var temp = distanceStore(
              parseFloat(userCoordinate[0]),
              parseFloat(userCoordinate[1]),
              parseFloat(storeCoordinate[0]),
              parseFloat(storeCoordinate[1])
            ); */
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); //in metres
}

const shortLongMonth = {
  Jan: "January",
  Feb: "Febuary",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};
const numToMonth = {
  "01": "January",
  "02": "Febuary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};
export function cleanDate(input: string) {
  // in date format YYYY-MM-DD-HH-MM-SS to YYYY/MM/DD
  let data;
  data = input.split("-");
  return "".concat(data[2].slice(0, 2), "/", data[1], "/", data[0]);
}

//use this block when calculating when LOTS OF PRODUCT + duplicate of store
//const userCoordinate = Body.userCoordinate.split(",");
/* 
const userCoordinate = "13.736705, 100.533205".split(",");
var storePresent = JSON.parse("{}");
?creates a dict of store with distance 
for (let i = 0; i < fullRes.length; i++) {
  //calculating the distance between the user and the store
  if (storePresent[fullRes[i].storeId] === undefined) {
    var storeCoordinate = fullRes[i].storeObject.coordinate.split(",");
    var temp = distanceStore(
      parseFloat(userCoordinate[0]),
      parseFloat(userCoordinate[1]),
      parseFloat(storeCoordinate[0]),
      parseFloat(storeCoordinate[1])
    );
    if (temp <= distance) {
      storePresent[fullRes[i].storeId] = temp;
    }
  }
}
var returnProducts = Array();
const max = fullRes.length;
// console.log(max);
// console.log(storePresent);
? if storeid equals then add relDistance
for (var i = 0; i < max; i++) {
  if (fullRes[i].storeId.toString() in storePresent) {
    fullRes[i]["relDistance"] = storePresent[fullRes[i].storeId];
    returnProducts.push(fullRes[i]);
  }
} 
*/
