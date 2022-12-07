import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Preloader from "components/basic/Preloader";
import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CartAction from "redux/actions/CartAction";
import CartService from "services/CartService";
import Quantity from "../components/basic/Quantity";
import PageHeading from "../components/composite/PageHeading";

function SingleProduct({ isAdmin, token, cartItems, totalPrice, totalItems }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [stateQuantity, setStateQuantity] = useState(1);
  const [allowsAddToCart, setAllowsAddToCart] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    let id = location.state.id;
    if (id) {
      HELPER.HTTP.executeGet(ENDPOINTS.GET_PRODUCT(id)).then((response) => {
        setData(response.content);
        setIsLoading(false);
      });
    }

    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    let thisItemInCart = null;
    for(const cartItem of cartItems){
      if(cartItem.id === data.id){
        thisItemInCart = cartItem;
        break;
      }
    }

    if(thisItemInCart){
      setAllowsAddToCart(thisItemInCart.quantity + stateQuantity <= data.stock);
    } else {
      setAllowsAddToCart(stateQuantity <= data.stock);
    }
  }, [stateQuantity, data, cartItems])

  const handleAddItem = () => {
    const itemsInCart = [...cartItems];
    let iTotalPrice = totalPrice;
    let iTotalItems = totalItems;
    const newItem = { id: data.id, title: data.title, price: data.price };

    let quantity = stateQuantity;
    let newItemIsInCart = false;
    let itemInCart;

    for (const item of itemsInCart) {
      if (item.id === newItem.id) {
        quantity += item.quantity;
        newItemIsInCart = true;
        itemInCart = item;

        break;
      }
    }

    if (newItemIsInCart) {
      itemInCart.quantity = quantity;
    } else {
      itemsInCart.push({ ...newItem, quantity: quantity });
    }

    iTotalItems += stateQuantity;
    iTotalPrice += quantity * newItem.price;

    dispatch(
      CartAction.set({
        items: itemsInCart,
        totalPrice: iTotalPrice,
        totalItems: iTotalItems,
      })
    );

    CartService.setItem(token, newItem.id, quantity);
  };

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
                        <h6>{`Quantity (${data.stock} in stock)`}</h6>
                      </div>
                      <div className="right-content">
                        <Quantity callbackWithValue={setStateQuantity} />
                      </div>
                    </div>
                    <div className="total">
                      <h4>{`Total: $ ${stateQuantity * data.price}`}</h4>
                      {!isAdmin ? (
                        <div className={`main-border-button ${allowsAddToCart ? "" : "disabled-button"}`}>
                          <Link onClick={(e) => {
                            e.preventDefault();
                            handleAddItem();
                          }}>{allowsAddToCart ? "Add To Cart" : "Out of Stock"}</Link>
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
    token: state.account.token,
    isAdmin: state.account.profile && state.account.profile.name === "Admin",
    cartItems: state.cart.items,
    totalPrice: state.cart.totalPrice,
    totalItems: state.cart.totalItems,
  };
};

export default connect(mapStateToProps)(SingleProduct);
