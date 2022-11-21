import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import ListModal from "components/basic/ListModal";
import MakeshiftButton from "components/basic/MakeshiftButton";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";
import FourOhFour from "pages/404";
import { useState } from "react";
import { useSelector } from "react-redux";

const Admin = () => {
  const [showProductListingModal, setShowProductListingModal] = useState(false);
  const [showOrderArrangementModal, setShowOrderArrangementModal] =
    useState(false);
  const account = useSelector((state) => state.account);

  if (account.auth === 0 || account.info.type !== "admin") {
    return <FourOhFour />;
  }

  const handleProducts = () => {
    setShowProductListingModal(true);
  };

  const handleOrders = () => {
    setShowOrderArrangementModal(true);
  };

  const onSaveEdit = (record) => {
    HELPER.HTTP.executePost(ENDPOINTS.UPDATE_PRODUCT, record);
  };

  const sections = [
    {
      imageURL: "assets/images/baner-right-image-01.jpg",
      text: "Orders",
      buttonText: "Arrange Orders",
      cta: handleOrders,
    },
  ];

  const productListingColumns = [
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
  const productListingActions = ["add", "edit", "delete"];

  const orderArrangementColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      dataType: "text",
      editable: false,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      dataType: "text",
      editable: false,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      dataType: "text",
      editable: false,
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
      dataType: "number",
      editable: false,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      dataType: "number",
      editable: false,
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
      dataType: "text",
      editable: false,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      dataType: "text",
      editable: false,
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
                  <Thumb
                    imageURL="assets/images/left-banner-image.jpg"
                    innerContent={
                      <>
                        <TextWithSubtitle text="Inventory Management" />
                        <MakeshiftButton
                          buttonText="See Product Listing"
                          onClick={handleProducts}
                        />
                      </>
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-content">
                  <div className="row">
                    {sections.map((section) => {
                      return (
                        <div className="col-lg-6" key={section.text}>
                          <div className="right-first-image">
                            <Thumb
                              imageURL={section.imageURL}
                              innerContent={
                                <>
                                  <TextWithSubtitle text={section.text} />
                                  <MakeshiftButton
                                    buttonText={section.buttonText}
                                    onClick={section.cta}
                                  />
                                </>
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
        columns={productListingColumns}
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
        actions={productListingActions}
        onSaveEdit={onSaveEdit}
      />
      <ListModal
        open={showOrderArrangementModal}
        setOpen={setShowOrderArrangementModal}
        title="Order Arrangement"
        columns={orderArrangementColumns}
        source={{
          endpoint: ENDPOINTS.GET_ORDERS,
          dataTransform: (response) => {
            return response.content.items.map((item) => {
              return {
                key: item.id,
                id: item.id,
                date: item.date,
                productName: item.productName,
                productQuantity: item.productQuantity,
                total: item.total,
                userID: item.userID,
                username: item.username,
              };
            });
          },
        }}
      />
    </>
  );
};

export default Admin;
