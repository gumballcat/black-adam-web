import ROUTES from "common/ROUTES";
import { Link } from "react-router-dom";

function Header() {
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
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
