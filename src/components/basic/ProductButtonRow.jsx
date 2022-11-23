import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartService from "services/CartService";
import CartAction from "../../redux/actions/CartAction";

const ProductButtonRow = ({ data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const account = useSelector((state) => state.account);

  const handleAddItem = () => {
    const itemsInCart = [...cart.items];
    let totalPrice = cart.totalPrice;
    let totalItems = cart.totalItems;
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

    totalItems += 1;
    totalPrice += newItem.price;

    dispatch(
      CartAction.set({
        items: itemsInCart,
        totalPrice: totalPrice,
        totalItems: totalItems,
      })
    );

    CartService.setItem(account.token, newItem.id, quantity);
  };

  return (
    <ul>
      <li>
        <Link to="/single-product" state={{ id: data.id }}>
          <i className="fa fa-eye"></i>
        </Link>
      </li>
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
    </ul>
  );
};

export default ProductButtonRow;
