import ENVS from "common/ENVS";
import ROUTES from "common/ROUTES";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="first-item">
              <div class="logo">
                <img
                  src="assets/images/logo-no-background.png"
                  style={{ width: 150, height: 41 }}
                  alt=""
                />
              </div>
              <ul>
                <li>
                  <span>{ENVS.OFFICE_LOCATION}</span>
                </li>
                <li>
                  <span>{ENVS.COMPANY_EMAIL}</span>
                </li>
                <li>
                  <span>{ENVS.COMPANY_PHONE_NUMBER}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3">
            <h4>Shopping &amp; Categories</h4>
            <ul>
              <li>
                <Link to={ROUTES.MEN_PRODUCTS}>Men's Shopping</Link>
              </li>
              <li>
                <Link to={ROUTES.WOMEN_PRODUCTS}>Women's Shopping</Link>
              </li>
              <li>
                <Link to={ROUTES.KIDS_PRODUCTS}>Kids' Shopping</Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-3">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link to={ROUTES.HOME}>Homepage</Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT}>About us</Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT}>Contact Us</Link>
              </li>
            </ul>
          </div>
          {/* <div class="col-lg-3">
            <h4>Help &amp; Information</h4>
            <ul>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">FAQ's</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Tracking ID</a>
              </li>
            </ul>
          </div> */}
          <div class="col-lg-12">
            <div class="under-footer">
              <p>
                Copyright © 2022 {ENVS.COMPANY_NAME} Co., Ltd. All Rights
                Reserved.
                <br />
                Design:{" "}
                <a
                  href="https://therichpost.com"
                  target="_parent"
                  title="free css templates"
                >
                  therichpost
                </a>
              </p>
              <ul>
                <li>
                  <a href={ENVS.FACEBOOK_URL}>
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href={ENVS.INSTAGRAM_URL}>
                    <i class="fa fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
