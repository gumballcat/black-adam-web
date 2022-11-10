import ROUTES from "common/ROUTES";
import ScrollToTop from "components/basic/ScrollToTop";
import Footer from "components/concrete/Footer";
import Header from "components/concrete/Header"; //Include Header
import About from "pages/About";
import Contact from "pages/Contact";
import Home from "pages/Home";
import KidsProducts from "pages/KidsProducts";
import LatestProducts from "pages/LatestProducts";
import MenProducts from "pages/MenProducts";
import SingleProduct from "pages/SingleProduct";
import WomenProducts from "pages/WomenProducts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
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
          <Route path={ROUTES.SingleProduct} element={<SingleProduct />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
