import { Badge, Menu, Space, Modal, Table } from "antd";
import ROUTES from "common/ROUTES";
import LoginModal from "components/basic/LoginModal";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountAction from "redux/actions/AccountAction";
import CartAction from "redux/actions/CartAction";
import "styles/css/Header.css";
import HELPER from "common/HELPER";
import ENDPOINTS from "common/ENDPOINTS";
import ChangePasswordModal from "components/basic/ChangePasswordModal";

function Header({ isLoggedIn, isAdmin, totalItems = 0 }) {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orders, setOrders] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);

  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

  const handleShowOrderModal = () => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_USER_ORDERS(account.profile.id), {
      headers: { Authorization: `Bearer ${account.token}` },
    }).then((response) => {
      setOrders(response.content);
      setShowOrderModal(true);
    });
  };

  const handleLogout = async () => {
    await dispatch(AccountAction.logout());
    await dispatch(CartAction.set({ items: [], totalPrice: 0, totalItems: 0 }));
    navigate("/");
  };

  const accountSubmenu = [
    {
      label: <Link>{`Hello, ${account.profile.name}`}</Link>,
      key: "greetings",
    },
    {
      label: (
        <Link
          onClick={handleLogout}
        >
          Logout
        </Link>
      ),
      key: "logout",
    },
  ];
  if (isAdmin) {
    accountSubmenu.splice(1, 0, {
      label: <Link to={ROUTES.ADMIN_ACCOUNT}>Admin Center</Link>,
      key: "adminCenter",
    });
  } else if (isLoggedIn) {
    accountSubmenu.splice(1, 0, {
      label: <Link onClick={handleShowOrderModal}>My Orders</Link>,
      key: "myOrders",
    });
  }
  accountSubmenu.splice(1, 0, {
    label: <Link onClick={handleShowChangePasswordModal}>Change password</Link>,
  });

  const menuItems = [
    { label: <Link to={ROUTES.HOME}>Home</Link>, key: "home" },
    { label: <Link to={ROUTES.MEN_PRODUCTS}>Men's</Link>, key: "men" },
    { label: <Link to={ROUTES.WOMEN_PRODUCTS}>Women's</Link>, key: "women" },
    { label: <Link to={ROUTES.KIDS_PRODUCTS}>Kid's</Link>, key: "kids" },
    {
      label: "Pages",
      key: "pages",
      children: [
        { label: <Link to={ROUTES.ABOUT}>About Us</Link>, key: "aboutUs" },
        {
          label: <Link to={ROUTES.LATEST_PRODUCTS}>Latest Products</Link>,
          key: "latestProducts",
        },
        {
          label: <Link to={ROUTES.CONTACT}>Contact Us</Link>,
          key: "contactUs",
        },
      ],
    },
    {
      label: isLoggedIn ? (
        "Account"
      ) : (
        <Link onClick={handleShowLoginModal}>Login</Link>
      ),
      key: "account",
      children: isLoggedIn ? accountSubmenu : [],
    },
  ];
  if (!isLoggedIn || !isAdmin) {
    menuItems.push({
      label: (
        <Space>
          <Badge size="small" count={totalItems} offset={[10, -5]}>
            <Link to={ROUTES.CHECKOUT}>Cart</Link>
          </Badge>
        </Space>
      ),
      key: "cart",
    });
  }

  return (
    <>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link className="logo" to={{ pathname: "/" }}>
                  <img
                    src="assets/images/logo-no-background.png"
                    style={{ width: 250, height: 69 }}
                    alt=""
                  />
                </Link>

                <Menu
                  mode="horizontal"
                  forceSubMenuRender={true}
                  items={menuItems}
                />
              </nav>
            </div>
          </div>
        </div>
      </header>

      <LoginModal signal={showLoginModal} setSignal={setShowLoginModal} />
      <ChangePasswordModal
        signal={showChangePasswordModal}
        setSignal={setShowChangePasswordModal}
      />
      <Modal
        open={showOrderModal}
        title="Your Orders"
        onOk={() => setShowOrderModal(false)}
        onCancel={() => setShowOrderModal(false)}
        width={1000}
        mask={false}
        centered
      >
        <Table
          columns={[
            {
              title: "Products",
              dataIndex: "orderItems",
              key: "products",
              render: (value, record) => {
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
              render: (value) => value
            },
          ]}
          dataSource={orders}
          bordered
        />
      </Modal>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.account.auth === 1,
    isAdmin: state.account.profile
      ? state.account.profile.name === "Admin"
      : false,
    totalItems: state.cart.totalItems,
  };
}

export default connect(mapStateToProps)(Header);
