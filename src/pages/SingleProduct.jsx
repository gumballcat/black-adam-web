import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Preloader from "components/basic/Preloader";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Quantity from "../components/basic/Quantity";
import RatingStars from "../components/basic/RatingStars";
import PageHeading from "../components/composite/PageHeading";

function SingleProduct({ isAdmin }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    let id = location.state.id;
    if (id) {
      HELPER.HTTP.executeGet(ENDPOINTS.GET_PRODUCT(id)).then((response) => {
        console.log(response.content);
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
          <PageHeading id="top" text={data.title} subtitle={data.description} />

          <section className="section" id="product">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="left-images">
                    <img src={data.thumbnailUrl} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="right-content">
                    <h4>{data.title}</h4>
                    <span className="price">{`$ ${data.price}`}</span>
                    <span>{data.description}</span>
                    <div className="quantity-content">
                      <div className="left-content">
                        <h6>No. of Orders</h6>
                      </div>
                      <div className="right-content">
                        <Quantity callbackWithValue={setQuantity} />
                      </div>
                    </div>
                    <div className="total">
                      <h4>{`Total: $ ${quantity * data.price}`}</h4>
                      {!isAdmin ? (
                        <div className="main-border-button">
                          <button>Add To Cart</button>
                        </div>
                      ) : (
                        <></>
                      )}
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

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: state.account.profile && state.account.profile.name === "Admin",
  };
};

export default connect(mapStateToProps)(SingleProduct);
