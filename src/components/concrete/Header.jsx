import ROUTES from "common/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountAction from "redux/actions/AccountAction";

function Header() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
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
                        <Link onClick={() => dispatch(AccountAction.logout())}>
                          Logout
                        </Link>
                      ) : (
                        <Link onClick={() => dispatch(AccountAction.login({}))}>
                          Login
                        </Link>
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
  );
}

export default Header;
