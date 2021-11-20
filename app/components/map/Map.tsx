import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  Polygon,
  InfoBox,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import PolygonOptions from "../../constants/PolygonOptions";
import PolyLineOptions from "../../constants/PolyLineOptions";
import * as types from "../../types/Types";
import * as utils from "../../utils/myUtils";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../../store";
import { getCenter } from "../../utils/myUtils";
import useApi from "../../hooks/useApi";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = (props: any) => {
  const { zones, token } = useStore();
  null;

  const [zoneId, setZoneId] = useState<String>("");
  const [zone, setZone] = useState<types.ExportedZone>();

  const markerHandler = (sentMarker: Object, index: Number) => {
    if (index !== 0) {
      const finalMarkers = props.markers.filter(
        (marker: Object) => marker !== sentMarker
      );
      props.setMarkers(finalMarkers);
    } else if (index === 0 && props.markers.length > 2) {
      const zoneInstance = {
        points: props.markers,
        color: "#000000",
        label: "",
      };
      if (zones) {
        const isIntersect = utils.checkIntersectionBetweenAll(
          zoneInstance,
          zones
        );
        if (isIntersect) {
          toast.error("Overlapping is not possible");
          props.setMarkers([]);
        } else {
          props.setCurrentZone(zoneInstance);
          props.openAddModal();
        }
      }
    }
  };
  const options: Object = { closeBoxURL: "", enableEventPropagation: true };

  const onMapLocationChange = useCallback((e: google.maps.MapMouseEvent) => {
    const newLocation = e.latLng?.toJSON();
    props.setMarkers((markers: []) => {
      return [...markers, newLocation];
    });
    console.log(newLocation);
  }, []);

  const onZoneRightClick = (data: any, zone: types.ExportedZone) => {
    const center = getCenter(zone.points);
    props.setShowInfoWindow(center);
    props.setZoneToBeEditedOrDeleted(zone);
  };

  const onDeleteHandler = () => {
    props.openDeleteModal();
    props.setShowInfoWindow(null);
  };

  const onEditHandler = () => {
    props.openEditModal();
    props.setShowInfoWindow(null);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API}`}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={onMapLocationChange}
        >
          {props.markers.map((marker: types.PathObject, index: any) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => markerHandler(marker, index)}
            />
          ))}
          <Polyline path={props.markers} options={PolyLineOptions()} />

          {props.currentZone ? (
            <Polygon
              paths={props.currentZone.points}
              options={PolygonOptions(props.currentZone.color)}
            />
          ) : (
            <></>
          )}

          {zones.map((zone: types.ExportedZone, index: any) => {
            return (
              <>
                <Polygon
                  key={index}
                  paths={zone.points}
                  options={PolygonOptions(zone.color)}
                  onRightClick={(rightClickReturn) =>
                    onZoneRightClick(rightClickReturn, zone)
                  }
                />
              </>
            );
          })}
          {props.showInfoWindow && (
            <InfoWindow options={options} position={props.showInfoWindow}>
              <div className="flex flex-col">
                <button
                  onClick={() => {
                    onEditHandler();
                  }}
                >
                  Edit zone
                </button>
                <button
                  onClick={() => {
                    onDeleteHandler();
                  }}
                >
                  Remove
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
