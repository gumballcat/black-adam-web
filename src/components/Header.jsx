import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link className="logo" to={{ pathname: "/" }}>
                blackadam
              </Link>

              <ul className="nav">
                <li className="scroll-to-section">
                  <a href="#top" className="active">
                    Home
                  </a>
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
                  <a href="javascript:;">Pages</a>
                  <ul>
                    <li>
                      <Link to={{ pathname: "/about" }}>About Us</Link>
                    </li>
                    <li>
                      <Link to={{ pathname: "/products" }}>Products</Link>
                    </li>
                    <li>
                      <Link to={{ pathname: "/single-product" }}>
                        Single Product
                      </Link>
                    </li>
                    <li>
                      <Link to={{ pathname: "/contact-us" }}>Contact Us</Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="javascript:;">Features</a>
                  <ul>
                    <li>
                      <a href="#">Features Page 1</a>
                    </li>
                    <li>
                      <a href="#">Features Page 2</a>
                    </li>
                    <li>
                      <a href="#">Features Page 3</a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href="https://therichpost.com/page/4"
                        target="_blank"
                      >
                        Template Page 4
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="scroll-to-section">
                  <a href="#explore">Explore</a>
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
