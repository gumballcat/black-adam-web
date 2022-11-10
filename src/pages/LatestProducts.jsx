import ENDPOINTS from "common/ENDPOINTS";
import Products from "components/composite/Products";

const LatestProducts = () => {
  return (
    <Products
      getEndpoint={ENDPOINTS.GET_LATEST_PRODUCTS}
      heading="Latest Products"
      subheading="Check out our latest products"
      title="Title for Latest Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default LatestProducts;
