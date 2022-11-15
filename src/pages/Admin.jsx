import ListModal from "components/basic/ListModal";
import MakeshiftButton from "components/basic/MakeshiftButton";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";
import HELPER from "common/HELPER";
import { useState } from "react";
import ENDPOINTS from "common/ENDPOINTS";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showProductListingModal, setShowProductListingModal] = useState(false);

  const handleProductCheck = () => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_LATEST_PRODUCTS).then((response) => {
      setProducts(
        response.content.items.map((item) => {
          return {
            key: item.id,
            name: item.name,
            price: item.price.quantity,
            rating: item.rating,
            description: item.description,
          };
        })
      );
      setShowProductListingModal(true);
    });
  };

  const banners = [
    {
      key: "plCheck",
      imageURL: "assets/images/baner-right-image-01.jpg",
      text: "Product Listing",
      ctaText: "Check",
      cta: handleProductCheck,
    },
    {
      key: "plAdd",
      imageURL: "assets/images/baner-right-image-02.jpg",
      text: "Product Listing",
      ctaText: "Add",
      ctaURL: "/products/men",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          <Button type="primary" icon={<EditOutlined />} size="small" />
        </>
      ),
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
                          <TextWithSubtitle text="Product Management" />
                        </>
                      }
                    />
                  }
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-content">
                  <div className="row">
                    {banners.map((rightBanner) => {
                      return (
                        <div className="col-lg-6" key={rightBanner.key}>
                          <div className="right-first-image">
                            <Thumb
                              imageURL={rightBanner.imageURL}
                              innerContent={
                                <>
                                  <TextWithSubtitle text={rightBanner.text} />
                                  <MakeshiftButton
                                    buttonText={rightBanner.ctaText}
                                    onClick={rightBanner.cta}
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
        columns={columns}
        data={products}
        expandable={true}
      />
    </>
  );
};

export default Admin;
