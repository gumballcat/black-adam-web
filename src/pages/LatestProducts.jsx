import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Products from "components/composite/Products";
import { useEffect, useState } from "react";

const LatestProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_MEN_PRODUCTS).then((response) => {
      setData([...response.content]);
    });
  }, []);

  return (
    <Products
      data={data}
      heading="Latest Products"
      subheading="Check out our latest products"
      title="Title for Latest Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default LatestProducts;
