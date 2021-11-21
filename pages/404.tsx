import Head from "next/head";
import Link from "next/link";

function Custom404() {
  const images = [
    "https://images.unsplash.com/photo-1603297638322-c7a08d52966c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  ];
  return (
    <>
      <Head>
        <title>Page not found 404</title>
      </Head>

      <div className="w-screen">
        <div
          className="hero min-h-screen h-full bg-fixed"
          style={{
            backgroundImage: `url(${
              images[Math.floor(Math.random() * images.length)]
            })`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="text-center hero-content text-neutral-content">
            <div className="flex flex-row text-base-content">
              <div className="flex xl:flex-row flex-col space-y-8" id="header">
                <header className="flex flex-col">
                  <h1 className="text-4xl md:text-5xl xl:text-8xl font-bold mb-2">{`404`}</h1>
                  <h1 className="text-4xl md:text-5xl xl:text-8xl font-bold mb-2">{`It's empty here`}</h1>
                  {/* <p className="text-xl xl:text-4xl font-extrabold">{`We can't find the page that you are looking for`}</p> */}
                  <div
                    style={{ fontFamily: "IBM Plex Mono,monospace" }}
                    className="mt-20"
                  >
                    <Link href="/">
                      <a
                        className="hover:bg-primary hover:text-primary-content rounded-box mb-4 p-0 text-3xl"
                        style={{
                          boxShadow: "-3px 5px #33332d",
                          padding: "0.6rem 1rem",
                          border: "3px solid",
                          fontWeight: "600",
                        }}
                      >
                        Back to homepage
                      </a>
                    </Link>
                  </div>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Custom404.layout = "L2";
export default Custom404;
