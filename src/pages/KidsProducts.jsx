import ENDPOINTS from "common/ENDPOINTS";
import Products from "components/composite/Products";

const KidsProducts = () => {
  return (
    <Products
      getEndpoint={ENDPOINTS.GET_KIDS_PRODUCTS}
      heading="Kids' Products"
      subheading="Check out our collection for Kids"
      title="Title for Kids' Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default KidsProducts;
