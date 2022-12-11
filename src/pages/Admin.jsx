import { Modal, Table } from "antd";
import ENDPOINTS from "common/ENDPOINTS";
import ENUMS from "common/ENUMS";
import HELPER from "common/HELPER";
import ListModal from "components/basic/ListModal";
import MakeshiftButton from "components/basic/MakeshiftButton";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";
import FourOhFour from "pages/404";
import { useState } from "react";
import { connect } from "react-redux";

const Admin = ({ isAdmin }) => {
  const [showProductListingModal, setShowProductListingModal] = useState(false);
  const [showOrderListingModal, setShowOrderListingModal] = useState(false);
  const [orders, setOrders] = useState(false);

  if (!isAdmin) {
    return <FourOhFour />;
  }

  const handleProducts = () => {
    setShowProductListingModal(true);
  };

  const handleOrders = () => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_ORDERS).then((response) => {
      setOrders(response.content);
      setShowOrderListingModal(true);
    });
  };

  const onSaveEditProduct = (record) => {
    HELPER.HTTP.executePut(ENDPOINTS.UPDATE_PRODUCT(record.id), {
      body: record,
    });
  };

  const onSaveEditOrder = (record) => {
    HELPER.HTTP.executePut(ENDPOINTS.UPDATE_ORDER(record.id, record.status));
  };

  const onAdd = (record) => {
    return HELPER.HTTP.executePost(ENDPOINTS.ADD_PRODUCT, {
      body: record,
    }).then((response) => {
      return response.data.content;
    });
  };

  const onDelete = (record) => {
    HELPER.HTTP.executeDelete(ENDPOINTS.DELETE_PRODUCT(record.id));
  };

  const sections = [
    {
      imageURL: "assets/images/baner-right-image-01.jpg",
      text: "Orders",
      buttonText: "See Order Listing",
      cta: handleOrders,
    },
  ];

  const categorySelectOptions = [];
  for (const key in ENUMS.CATEGORY) {
    categorySelectOptions.push({
      value: ENUMS.CATEGORY[key].id,
      label: ENUMS.CATEGORY[key].title,
    });
  }

  const orderStatusSelectOptions = [];
  for(const key in ENUMS.ORDER_STATUS){
    orderStatusSelectOptions.push({
      value: ENUMS.ORDER_STATUS[key].id,
      label: ENUMS.ORDER_STATUS[key].title
    })
  }

  const productListingColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      dataType: "number",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      dataType: "text",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "categoryIds",
      key: "categoryIDs",
      editable: true,
      dataType: "select",
      selectMode: "multiple",
      options: categorySelectOptions,
      styles: { width: 240 },
      currentOption: (record, options) => {
        if (!record.categoryIds) {
          return [];
        }
        const currentOption = options
          .filter((option) => record.categoryIds.includes(option.value))
          .map((option) => option.label);
        return currentOption;
      },
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnail",
      editable: true,
      dataType: "image",
    },
  ];
  const productListingActions = ["add", "edit", "delete"];

  const orderListingColumns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (value) => {
        return (
          <>
            {value.id}
            <br />
            {value.name}
          </>
        );
      },
    },
    {
      title: "Products",
      dataIndex: "orderItems",
      key: "products",
      render: (value) => {
        return value.map((item) => (
          <>
            {`${item.product.title}: ${item.quantity} ($${
              item.quantity * item.product.price
            })`}
            <br />
          </>
        ));
      },
    },
    {
      title: "Shipping Details",
      dataIndex: "address",
      key: "shippingDetails",
      render: (value, record) => {
        return (
          <>
            {record.phone}
            <br />
            {value.street}
            <br />
            {value.district}
            <br />
            {value.province}
            <br />
            {value.city}
            <br />
            {value.zipCode}
            <br />
          </>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "totalCost",
      key: "total",
      render: (value) => `$${value}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      editable: true,
      dataType: "select",
      selectMode: "single",
      options: orderStatusSelectOptions,
      styles: { width: 240 },
      currentOption: (record, options) => {
        const currentOption = options
          .filter((option) => record.status === option.value)
          .map((option) => option.label);
        return currentOption;
      },
    },
  ];
  const orderListingActions = ["edit"];

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
          dataTransform: (item) => {
            return {
              key: item.id,
              id: item.id,
              title: item.title,
              price: item.price,
              stock: item.stock,
              categoryIds: item.categoryIds,
              thumbnailUrl: item.thumbnailUrl,
              description: item.description,
            };
          },
        }}
        actions={productListingActions}
        onSaveEdit={onSaveEditProduct}
        onAdd={onAdd}
        onDelete={onDelete}
      />

      <ListModal
        open={showOrderListingModal}
        setOpen={setShowOrderListingModal}
        title="Order Listing"
        columns={orderListingColumns}
        source={{
          endpoint: ENDPOINTS.GET_ORDERS,
          dataTransform: (item) => {
            return {
              key: item.id,
              id: item.id,
              address: item.address,
              orderItems: item.orderItems,
              phone: item.phone,
              status: item.status,
              totalCost: item.totalCost,
              user: item.user,
            };
          },
        }}
        actions={orderListingActions}
        onSaveEdit={onSaveEditOrder}
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: state.account.auth === 1 && state.account.profile.name === "Admin",
  };
};

export default connect(mapStateToProps)(Admin);
