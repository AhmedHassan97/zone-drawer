import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MapComponent from "../app/components/map/MapComponent";
const Home: NextPage = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default Home;
