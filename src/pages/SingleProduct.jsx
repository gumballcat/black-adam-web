import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Preloader from "components/basic/Preloader";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Quantity from "../components/basic/Quantity";
import RatingStars from "../components/basic/RatingStars";
import PageHeading from "../components/composite/PageHeading";

function SingleProduct(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    let id = location.state.id;
    if (id > 0) {
      HELPER.HTTP.executeGet(ENDPOINTS.GET_PRODUCT, {
        id: id,
      }).then((response) => {
        setData(response.content);
        setIsLoading(false);
      });
    }

    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <div className="single-product-main" ref={ref}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <PageHeading id="top" text={data.name} subtitle={data.description} />

          <section className="section" id="product">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="left-images">
                    <img src={data.imageURL} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="right-content">
                    <h4>{data.name}</h4>
                    <span className="price">{`${data.price?.unit} ${data.price?.quantity}`}</span>
                    <RatingStars quantity={data.rating} />
                    <span>{data.description}</span>
                    <div className="quantity-content">
                      <div className="left-content">
                        <h6>No. of Orders</h6>
                      </div>
                      <div className="right-content">
                        <Quantity callbackWithValue={setQuantity} />
                      </div>
                    </div>
                    <div class="total">
                      <h4>{`Total: ${data.price?.unit} ${
                        quantity * data.price?.quantity
                      }`}</h4>
                      <div class="main-border-button">
                        <a href="#">Add To Cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default SingleProduct;
