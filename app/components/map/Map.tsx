import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import { useCallback } from "react";
import PolygonOptions from "../../constants/PolygonOptions";
import PolyLineOptions from "../../constants/PolyLineOptions";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
export type PolygonObject = {
  path: Object;
  options: Object;
  name: String;
};
const Map = (props: any) => {
  const markerHandler = (sentMarker: Object, index: Number) => {
    if (index !== 0) {
      const finalMarkers = props.markers.filter(
        (marker: Object) => marker !== sentMarker
      );
      props.setMarkers(finalMarkers);
    } else if (index === 0 && props.markers.length > 2) {
      const polygonInstance = {
        path: props.markers,
        options: PolygonOptions("#000000"),
        name: "",
      };
      props.setCurrentPolygon(polygonInstance);
      props.openModal();
    }
  };
  const onMapLocationChange = useCallback((e: google.maps.MouseEvent) => {
    const newLocation = e.latLng.toJSON();
    props.setMarkers((markers: []) => {
      return [...markers, newLocation];
    });
    console.log(newLocation);
  }, []);

  return (
    <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapLocationChange}
      >
        {props.markers.map((marker: Object, index: any) => (
          <Marker
            key={index}
            position={marker}
            onClick={() => markerHandler(marker, index)}
          />
        ))}
        <Polyline path={props.markers} options={PolyLineOptions()} />

        {props.currentPolygon ? (
          <Polygon
            paths={props.currentPolygon.path}
            options={props.currentPolygon.options}
          />
        ) : (
          <></>
        )}

        {props.polygons.map((polygon: PolygonObject, index: any) => (
          <Polygon key={index} paths={polygon.path} options={polygon.options} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
