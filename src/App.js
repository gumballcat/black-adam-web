import "antd/dist/antd.css";
import ROUTES from "common/ROUTES";
import ScrollToTop from "components/basic/ScrollToTop";
import Footer from "components/concrete/Footer";
import Header from "components/concrete/Header"; //Include Header
import FourOhFour from "pages/404";
import About from "pages/About";
import Admin from "pages/Admin";
import Contact from "pages/Contact";
import Home from "pages/Home";
import KidsProducts from "pages/KidsProducts";
import LatestProducts from "pages/LatestProducts";
import MenProducts from "pages/MenProducts";
import Regular from "pages/Regular";
import SingleProduct from "pages/SingleProduct";
import WomenProducts from "pages/WomenProducts";
import { useCallback } from "react";
import { Particles } from "react-particles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          particles: {
            number: {
              value: 160,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 1,
              random: {
                enable: true,
                minimumValue: 0.1,
              },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: {
                enable: true,
                minimumValue: 1,
              },
            },
            move: {
              enable: true,
              speed: 0.17,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              resize: false,
            },
          },
          detectRetina: true,
        }}
      />
      <BrowserRouter>
        <Header></Header>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LATEST_PRODUCTS} element={<LatestProducts />} />
          <Route path={ROUTES.MEN_PRODUCTS} element={<MenProducts />} />
          <Route path={ROUTES.WOMEN_PRODUCTS} element={<WomenProducts />} />
          <Route path={ROUTES.KIDS_PRODUCTS} element={<KidsProducts />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
          <Route path={ROUTES.ADMIN_ACCOUNT} element={<Admin />} />
          <Route path={ROUTES.REGULAR_ACCOUNT} element={<Regular />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
