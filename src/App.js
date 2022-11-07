import Footer from "components/concrete/Footer";
import Header from "components/concrete/Header"; //Include Header
import About from "pages/About";
import Contact from "pages/Contact";
import Home from "pages/Home";
import Products from "pages/Products";
import SingleProduct from "pages/SingleProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/single-product" element={<SingleProduct />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
