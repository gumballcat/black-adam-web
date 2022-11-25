import ENDPOINTS from "common/ENDPOINTS";
import ENUMS from "common/ENUMS";
import HELPER from "common/HELPER";
import Products from "components/composite/Products";
import { useEffect, useState } from "react";

const WomenProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_WOMEN_PRODUCTS).then((response) => {
      const newData = [];
      response.content.forEach((item) => {
        if (item.categoryIds.includes(ENUMS.CATEGORY.WOMEN.id)) {
          newData.push(item);
        }
      });
      setData([...newData]);
    });
  }, []);

  return (
    <Products
      data={data}
      heading="Women's Products"
      subheading="Check out our collection for Women"
      title="Title for Women's Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default WomenProducts;
