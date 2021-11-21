const PolygonOptions = (polygonColor: String) => {
  const Options: Object = {
    fillColor: polygonColor,
    fillOpacity: 0.5,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: true,
    draggable: false,
    editable: true,
    geodesic: false,
    zIndex: 1,
  };
  return Options;
};
export default PolygonOptions;
