import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartAction from "../../redux/actions/CartAction";

const ProductButtonRow = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(
      CartAction.add({
        id: data.id,
        name: data.name,
        price: data.price,
      })
    );
  };

  return (
    <ul>
      <li>
        <Link to="/single-product" state={{ id: data.id }}>
          <i className="fa fa-eye"></i>
        </Link>
      </li>
      <li>
        <Link onClick={handleAddItem}>
          <i className="fa fa-shopping-cart"></i>
        </Link>
      </li>
    </ul>
  );
};

export default ProductButtonRow;
