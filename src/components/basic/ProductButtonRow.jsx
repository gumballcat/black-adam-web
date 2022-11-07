import { Link } from "react-router-dom";

const ProductButtonRow = ({ id }) => {
  return (
    <ul>
      <li>
        <Link to="/single-product" state={{ id: id }}>
          <i class="fa fa-eye"></i>
        </Link>
      </li>
      <li>
        <a href="single-product.html">
          <i class="fa fa-shopping-cart"></i>
        </a>
      </li>
    </ul>
  );
};

export default ProductButtonRow;
