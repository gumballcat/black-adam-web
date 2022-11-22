import { Badge, Menu, Space } from "antd";
import ROUTES from "common/ROUTES";
import LoginModal from "components/basic/LoginModal";
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountAction from "redux/actions/AccountAction";
import AuthenticationService from "services/AuthenticationService";
import "styles/css/Header.css";

function Header({ totalItems = 0 }) {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShow = () => setShowLoginModal(true);

  const handleLogout = () => {
    AuthenticationService.logout();
    dispatch(AccountAction.logout());
  };

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
      label:
        account.auth === 0 ? (
          <Link onClick={handleShow}>Login</Link>
        ) : (
          "Account"
        ),
      key: "account",
      children:
        account.auth === 1
          ? [
              {
                label: (
                  <Link
                    to={
                      account.info.type === "admin" ? ROUTES.ADMIN_ACCOUNT : ""
                    }
                  >{`Hello, ${account.info.name}`}</Link>
                ),
                key: "greetings",
              },
              {
                label: <Link onClick={handleLogout}>Logout</Link>,
                key: "logout",
              },
            ]
          : [],
    },
  ];
  if (account.info.type === "regular") {
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
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    totalItems: state.cart.totalItems,
  };
}

export default connect(mapStateToProps)(Header);
