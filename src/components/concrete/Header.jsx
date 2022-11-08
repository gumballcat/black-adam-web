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
                  <Link to="/">Home</Link>
                </li>
                <li className="scroll-to-section">
                  <a href="#men">Men's</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#women">Women's</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#kids">Kid's</a>
                </li>
                <li className="submenu">
                  <a href="#">Pages</a>
                  <ul>
                    <li>
                      <Link to={{ pathname: "/about" }}>About Us</Link>
                    </li>
                    <li>
                      <Link to={{ pathname: "/products" }}>
                        Latest Products
                      </Link>
                    </li>
                    <li>
                      <Link to={{ pathname: "/contact-us" }}>Contact Us</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
