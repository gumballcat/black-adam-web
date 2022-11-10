import ENDPOINTS from "common/ENDPOINTS";
import Products from "components/composite/Products";

const WomenProducts = () => {
  return (
    <Products
      getEndpoint={ENDPOINTS.GET_WOMEN_PRODUCTS}
      heading="Women's Products"
      subheading="Check out our collection for Women"
      title="Title for Women's Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default WomenProducts;
