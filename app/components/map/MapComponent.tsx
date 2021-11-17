import Head from "next/head";
import Map from "./Map";
import { useState, useCallback, useEffect } from "react";
import Modal from "./Modal";
import PolygonOptions from "../../constants/PolygonOptions";
// import * as jsts from "jsts/dist/jsts";
type PolygonObject = {
  path: Object;
  options: Object;
  name: String;
};

type FormValues = {
  zone: string;
  color: string;
};
const MapComponent = () => {
  const [markers, setMarkers] = useState<Array<Object>>([]);
  const [polygons, setPolygons] = useState<Array<PolygonObject>>([]);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [currentPolygon, setCurrentPolygon] = useState<PolygonObject | null>();

  useEffect(() => {
    if (isModalOpen === false && (markers || currentPolygon)) {
      setMarkers([]);
      setCurrentPolygon(null);
    }
  }, [isModalOpen]);
  const colorHandler = (event: any) => {
    if (currentPolygon) {
      const polygonInstance = {
        path: markers,
        options: PolygonOptions(event.target.value),
        name: "",
      };
      setCurrentPolygon(polygonInstance);
      console.log(event.target.value);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data.zone, data.color);

    const newPolygon = {
      path: markers,
      options: PolygonOptions(data.color),
      name: data.zone,
    };
    console.log(newPolygon);

    setMarkers([]);
    setCurrentPolygon(null);
    closeModal();
    setPolygons((polygons: any) => {
      return [...polygons, newPolygon];
    });
  };
  return (
    <div>
      <Modal
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        colorHandler={colorHandler}
        onSubmit={onSubmit}
      />
      <Map
        markers={markers}
        setMarkers={setMarkers}
        setCurrentPolygon={setCurrentPolygon}
        openModal={openModal}
        currentPolygon={currentPolygon}
        polygons={polygons}
      />
    </div>
  );
};

export default MapComponent;
