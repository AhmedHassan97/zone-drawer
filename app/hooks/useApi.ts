import { useState, useEffect } from "react";
import * as types from "../types/Types";
import axios from "axios";
import { useStore } from "../store";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const DeleteZone = async (zoneId: String, token: String) => {
  const result = await axios.delete(
    `${url}/zones/${zoneId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};
const AddZone = async (
  label: String,
  color: String,
  points: Array<types.PathObject>,
  token: String
) => {
  const result = await axios.post(
    `${url}/zones`,
    {
      label: label,
      color: color,
      points: points,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result;
};
const UpdateZone = async (token: String, zoneId: String, newObj: Object) => {
  const result = await axios.put(`${url}/zones/${zoneId}`, newObj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const GetZones = async (token: String) => {
  const result = await axios.get(`${url}/zones`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const useApi = () => {
  const { addZones } = useStore();
  const getZones = (token: String) => {
    const newZones: Array<types.ExportedZone> = [];
    GetZones(token)
      .then((result) => {
        result.data.data.map((zone: types.ExportedZone) => {
          const newZone = {
            label: zone.label,
            color: zone.color,
            points: zone.points,
            _id: zone._id,
          };
          const newPoints: Array<types.PathObject> = [];
          newZone.points.map((point) => {
            const newPoint: types.PathObject = {
              lat: Number(point.lat),
              lng: Number(point.lng),
            };
            newPoints.push(newPoint);
          });
          newZone.points = newPoints;
          newZones.push(newZone);
        });
      })
      .then(() => {
        addZones(newZones);
      });
  };
  const addZone = async (ZoneObject: types.Zone, token: String) => {
    try {
      const result = await AddZone(
        ZoneObject.label,
        ZoneObject.color,
        ZoneObject.points,
        token
      );
      if (result) {
        getZones(token);
        console.log("not err");
        return true;
      } else {
        console.log("error");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const deleteZone = (zoneId: String, token: String) => {
    DeleteZone(zoneId, token)
      .then((result) => {
        console.log(result);
      })
      .then(() => getZones(token));
  };
  const editZone = (zoneId: String, token: String, newZone: Object) => {
    UpdateZone(token, zoneId, newZone)
      .then((result) => {
        console.log(result);
      })
      .then(() => getZones(token));
  };
  return { getZones, addZone, deleteZone, editZone };
};

export default useApi;
