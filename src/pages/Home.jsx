import ENDPOINTS from "common/ENDPOINTS";
import ENVS from "common/ENVS";
import HELPER from "common/HELPER";
import LatestSection from "components/concrete/LatestSection";
import MainBannerSection from "components/concrete/MainBannerSection";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeSections, setHomeSections] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_HOME_SECTIONS).then((response) => {
      setHomeSections(response.items);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="home-main">
      {isLoading
        ? "Loading, please wait"
        : homeSections.map((homeSection) => {
            const meta = homeSection.meta;
            const data = homeSection.main;

            let ret;
            if (meta.sectionType === 1) {
              ret = (
                <MainBannerSection
                  leftBanner={data.primaryBanner}
                  rightBanners={data.categoryBanners}
                />
              );
            } else if (meta.sectionType === 2) {
              ret = <LatestSection id={meta.id} data={data} />;
            }
            return ret;
          })}

      <section class="section" id="explore">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-content">
                <h2>Explore Our Products</h2>
                <div class="quote">
                  <i class="fa fa-quote-left"></i>
                  <p>
                    You are not allowed to redistribute this template ZIP file
                    on any other website.
                  </p>
                </div>
                <div class="main-border-button">
                  <a href="products.html">Discover More</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-content">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="leather">
                      <h4>Leather Bags</h4>
                      <span>Latest Collection</span>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="first-image">
                      <img src="assets/images/explore-image-01.jpg" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="second-image">
                      <img src="assets/images/explore-image-02.jpg" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="types">
                      <h4>Different Types</h4>
                      <span>Over 304 Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="social">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <h2>Social Media</h2>
                <span>
                  Details to details is what makes {ENVS.COMPANY_NAME} different
                  from the other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row images">
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>Fashion</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-01.jpg" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>New</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-02.jpg" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>Brand</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-03.jpg" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>Makeup</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-04.jpg" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>Leather</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-05.jpg" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="thumb">
                <div class="icon">
                  <a href="http://instagram.com">
                    <h6>Bag</h6>
                    <i class="fa fa-instagram"></i>
                  </a>
                </div>
                <img src="assets/images/instagram-06.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="subscribe">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="section-heading">
                <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
                <span>
                  Details to details is what makes {ENVS.COMPANY_NAME} different
                  from the other themes.
                </span>
              </div>
              <form id="subscribe" action="" method="get">
                <div class="row">
                  <div class="col-lg-5">
                    <fieldset>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-5">
                    <fieldset>
                      <input
                        name="email"
                        type="text"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your Email Address"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-2">
                    <fieldset>
                      <button
                        type="submit"
                        id="form-submit"
                        class="main-dark-button"
                      >
                        <i class="fa fa-paper-plane"></i>
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-4">
              <div class="row">
                <div class="col-6">
                  <ul>
                    <li>
                      Store Location:
                      <br />
                      <span>{ENVS.STORE_LOCATION}</span>
                    </li>
                    <li>
                      Phone:
                      <br />
                      <span>{ENVS.COMPANY_PHONE_NUMBER}</span>
                    </li>
                    <li>
                      Office Location:
                      <br />
                      <span>{ENVS.OFFICE_LOCATION}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul>
                    <li>
                      Work Hours:
                      <br />
                      <span>{ENVS.WORK_HOURS}</span>
                    </li>
                    <li>
                      Email:
                      <br />
                      <span>{ENVS.COMPANY_EMAIL}</span>
                    </li>
                    <li>
                      Social Media:
                      <br />
                      <span>
                        <a href={ENVS.FACEBOOK_URL}>Facebook</a>,{" "}
                        <a href={ENVS.INSTAGRAM_URL}>Instagram</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
