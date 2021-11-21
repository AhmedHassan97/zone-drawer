import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Geo-Fencing</title>
        <meta
          name="description"
          content="On this website you can draw zone on google maps. Also you can edit or delete the zones you created."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="og:title" property="og:title" content="Geo-Fencing"></meta>
        <meta
          name="og:description"
          property="og:description"
          content="On this website you can draw zone on google maps. Also you can edit or delete the zones you created."
        ></meta>
        <meta property="og:site_name" content="Geo-Fencing"></meta>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
