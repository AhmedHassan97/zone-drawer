import * as types from "../types/Types";
import intersect from "./utils";
export const changeObjectPropertyNames = (zone: types.Zone) => {
  const newPath: Array<Object> = [];
  zone.points.map((point: types.PathObject) => {
    newPath.push({ x: Number(point.lat), y: Number(point.lng) });
  });
  return newPath;
};
export const getCenter = (points: Array<types.PathObject>) => {
  let lat = 0;
  let lng = 0;
  points.map((point: types.PathObject) => {
    lat += point.lat;
    lng += point.lng;
  });
  const center: types.PathObject = {
    lat: lat / points.length,
    lng: lng / points.length,
  };
  return center;
};
export const checkIntersection = (zone1: types.Zone, zone2: types.Zone) => {
  const intersection = intersect(
    changeObjectPropertyNames(zone1),
    changeObjectPropertyNames(zone2)
  );
  return intersection;
};

export const checkIntersectionBetweenAll = (
  zone: types.Zone,
  zones: Array<types.Zone>
) => {
  for (let index = 0; index < zones.length; index++) {
    const intersection: any = checkIntersection(zones[index], zone);
    if (intersection.length > 0) {
      return true;
    }
  }
  return false;
};
