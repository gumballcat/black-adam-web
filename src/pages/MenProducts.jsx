import ENDPOINTS from "common/ENDPOINTS";
import Products from "components/composite/Products";

const MenProducts = () => {
  return (
    <Products
      getEndpoint={ENDPOINTS.GET_MEN_PRODUCTS}
      heading="Men's Products"
      subheading="Check out our collection for Men"
      title="Title for Men's Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default MenProducts;
