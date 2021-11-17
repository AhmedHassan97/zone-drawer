const PolygonOptions = (polygonColor: String) => {
  return {
    fillColor: polygonColor,
    fillOpacity: 0.5,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };
};
export default PolygonOptions;
