import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import CartService from "services/CartService";
import CartAction from "../../redux/actions/CartAction";

const ProductButtonRow = ({ data, token, isAdmin, cartItems, totalPrice, totalItems }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    const itemsInCart = [...cartItems];
    let iTotalPrice = totalPrice;
    let iTotalItems = totalItems;
    const newItem = { id: data.id, title: data.title, price: data.price };

    let quantity = 1;
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
      itemsInCart.push({ ...newItem, quantity: 1 });
    }

    iTotalItems += 1;
    iTotalPrice += newItem.price;

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
    <ul>
      <li>
        <Link to="/single-product" state={{ id: data.id }}>
          <i className="fa fa-eye"></i>
        </Link>
      </li>
      {!isAdmin ? (
        <li>
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleAddItem();
            }}
          >
            <i className="fa fa-shopping-cart"></i>
          </Link>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.account.token,
    isAdmin: state.account.profile && state.account.profile.name === "Admin",
    cartItems: state.cart.items,
    totalPrice: state.cart.totalPrice,
    totalItems: state.cart.totalItems,
  };
};

export default connect(mapStateToProps)(ProductButtonRow);
