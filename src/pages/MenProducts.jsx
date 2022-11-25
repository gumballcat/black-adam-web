import ENDPOINTS from "common/ENDPOINTS";
import ENUMS from "common/ENUMS";
import HELPER from "common/HELPER";
import Products from "components/composite/Products";
import { useEffect, useState } from "react";

const MenProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_MEN_PRODUCTS).then((response) => {
      const newData = [];
      response.content.forEach((item) => {
        if (item.categoryIds.includes(ENUMS.CATEGORY.MEN.id)) {
          newData.push(item);
        }
      });
      setData([...newData]);
    });
  }, [])

  return (
    <Products
      data={data}
      heading="Men's Products"
      subheading="Check out our collection for Men"
      title="Title for Men's Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default MenProducts;
