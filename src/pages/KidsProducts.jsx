import ENDPOINTS from "common/ENDPOINTS";
import ENUMS from "common/ENUMS";
import HELPER from "common/HELPER";
import Products from "components/composite/Products";
import { useEffect, useState } from "react";

const KidsProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_KIDS_PRODUCTS).then((response) => {
      const newData = [];
      response.content.forEach((item) => {
        if (item.categoryIds.includes(ENUMS.CATEGORY.KIDS.id)) {
          newData.push(item);
        }
      });
      setData([...newData]);
    });
  }, []);

  return (
    <Products
      data={data}
      heading="Kids' Products"
      subheading="Check out our collection for Kids"
      title="Title for Kids' Products"
      subtitle="Me running out of ideas"
    />
  );
};

export default KidsProducts;
