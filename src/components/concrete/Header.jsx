import ROUTES from "common/ROUTES";
import LoginModal from "components/basic/LoginModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountAction from "redux/actions/AccountAction";
import AuthenticationService from "services/AuthenticationService";

function Header() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleShow = () => setShowLoginModal(true);

  const onSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;

    AuthenticationService.login(username, password)
      .then((response) => {
        console.log(response);
        dispatch(AccountAction.login(response.content));
        setShowLoginModal(false);
      })
      .catch((error) => {
        console.log(error);
        setModalMessage({
          type: "error",
          text: error.errorMessage,
        });
      });
  };

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

                <ul className="nav">
                  <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to={ROUTES.MEN_PRODUCTS}>Men's</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to={ROUTES.WOMEN_PRODUCTS}>Women's</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to={ROUTES.KIDS_PRODUCTS}>Kid's</Link>
                  </li>
                  <li className="submenu">
                    <span>Pages</span>
                    <ul>
                      <li>
                        <Link to={ROUTES.ABOUT}>About Us</Link>
                      </li>
                      <li>
                        <Link to={ROUTES.LATEST_PRODUCTS}>Latest Products</Link>
                      </li>
                      <li>
                        <Link to={ROUTES.CONTACT}>Contact Us</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <span>Account</span>
                    <ul>
                      <li>
                        {account.auth === 1 ? (
                          <>
                            <Link>{`Hello, ${account.info.name}`}</Link>
                            <Link
                              onClick={() => dispatch(AccountAction.logout())}
                            >
                              Logout
                            </Link>
                          </>
                        ) : (
                          <Link onClick={handleShow}>Login</Link>
                        )}
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        signal={showLoginModal}
        setSignal={setShowLoginModal}
        onSubmit={onSubmit}
        message={modalMessage}
        setMessage={setModalMessage}
      />
    </>
  );
}

export default Header;
