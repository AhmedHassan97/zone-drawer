import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  Polygon,
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

const containerStyle = {
  width: "100vw",
  height: "93vh",
};

const center = {
  lat: 30.033333,
  lng: 31.233334,
};

const Map = (props: any) => {
  const { zones } = useStore();
  const [label, setLabel] = useState<String>("");
  const markerHandler = (sentMarker: Object, index: Number) => {
    if (index !== 0) {
      const finalMarkers = props.markers.filter(
        (marker: Object) => marker !== sentMarker
      );
      props.setMarkers(finalMarkers);
    } else if (index === 0 && props.markers.length > 2) {
      const zoneInstance = {
        points: props.markers,
        color: props.color,
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
    props.setShowInfoWindow(null);
  }, []);

  const onZoneRightClick = (data: any, zone: types.ExportedZone) => {
    const center = getCenter(zone.points);
    props.setZoneToBeEditedOrDeleted(zone);
    props.setShowInfoWindow(center);
    setLabel(zone.label);
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
            <InfoWindow
              onCloseClick={() => props.setShowInfoWindow(null)}
              options={options}
              position={props.showInfoWindow}
            >
              <div className="flex flex-col space-y-2">
                <h1>{label}</h1>
                <button
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    onEditHandler();
                  }}
                >
                  Edit zone
                </button>
                <button
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    onDeleteHandler();
                  }}
                >
                  Delete Zone
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
