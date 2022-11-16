import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import ListModal from "components/basic/ListModal";
import MakeshiftButton from "components/basic/MakeshiftButton";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";
import { useState } from "react";
import { useSelector } from "react-redux";
import FourOhFour from "./404";

const Admin = () => {
  const [showProductListingModal, setShowProductListingModal] = useState(false);
  const account = useSelector((state) => state.account);

  if (account.auth === 0 || account.info.type !== "admin") {
    return <FourOhFour />;
  }

  const handleProductCheck = () => {
    setShowProductListingModal(true);
  };

  const onSaveEdit = (record) => {
    HELPER.HTTP.executePost(ENDPOINTS.UPDATE_PRODUCT, record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      dataType: "text",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      dataType: "number",
      editable: true,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      dataType: "number",
      editable: true,
    },
  ];

  return (
    <>
      <div className="home-main">
        <div className="main-banner" id="top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="left-content">
                  {
                    <Thumb
                      imageURL="assets/images/left-banner-image.jpg"
                      innerContent={
                        <>
                          <TextWithSubtitle text="Inventory Management" />
                          <MakeshiftButton
                            buttonText="See Product Listing"
                            onClick={handleProductCheck}
                          />
                        </>
                      }
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListModal
        open={showProductListingModal}
        setOpen={setShowProductListingModal}
        title="Product Listing"
        columns={columns}
        source={{
          endpoint: ENDPOINTS.GET_LATEST_PRODUCTS,
          dataTransform: (response) => {
            return response.content.items.map((item) => {
              return {
                key: item.id,
                id: item.id,
                name: item.name,
                price: item.price.quantity,
                rating: item.rating,
                description: item.description,
              };
            });
          },
        }}
        onSaveEdit={onSaveEdit}
      />
    </>
  );
};

export default Admin;
