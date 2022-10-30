import ENVS from "common/ENVS";
import TextWithSubtitle from "../components/basic/TextWithSubtitle";
import Thumb from "../components/basic/Thumb";
import SocialMarkers from "../components/concrete/SocialMarkers";
import SubscribeSection from "../components/concrete/SubscribeSection";

function About() {
  return (
    <div className="about-main">
      <div class="page-heading about-page-heading" id="top">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="inner-content">
                <TextWithSubtitle
                  text="About Our Company"
                  subtitle="We Are Friendly"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about-us">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-image">
                <img src="assets/images/about-left-image.jpg" alt="" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-content">
                <TextWithSubtitle
                  text="About Us & Our Skills"
                  subtitle="Our distinct skill set and steamy passion for the trace are keys to our success"
                />
                <div class="quote">
                  <i class="fa fa-quote-left"></i>
                  <p>
                    When love and skill work together, expect a masterpiece.
                  </p>
                </div>
                <p>
                  No difficulty can discourage, no obstacle dismay, no trouble
                  dishearten us, who have acquired the art of pleasuring our
                  customers. Difficulties are but dares of fate, obstacles but
                  hurdles to try our skill, troubles but bitter tonics to give
                  us strength; and we rises higher and looms greater after each
                  encounter with adversity.
                </p>
                <SocialMarkers />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="our-team">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <TextWithSubtitle
                  text="Our Amazing Team"
                  subtitle="Without whom non of these would come into fruitition"
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="team-item">
                <Thumb
                  imageURL="assets/images/team-member-01.jpg"
                  customContent={
                    <div class="hover-effect">
                      <div class="inner-content">
                        <SocialMarkers />
                      </div>
                    </div>
                  }
                />
                <div class="down-content">
                  <TextWithSubtitle
                    text="John Doe"
                    subtitle="Product Specialist"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="team-item">
                <Thumb
                  imageURL="assets/images/team-member-02.jpg"
                  customContent={
                    <div class="hover-effect">
                      <div class="inner-content">
                        <SocialMarkers />
                      </div>
                    </div>
                  }
                />
                <div class="down-content">
                  <TextWithSubtitle
                    text="James Dore"
                    subtitle="Backend Engineer"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="team-item">
                <Thumb
                  imageURL="assets/images/team-member-03.jpg"
                  customContent={
                    <div class="hover-effect">
                      <div class="inner-content">
                        <SocialMarkers />
                      </div>
                    </div>
                  }
                />
                <div class="down-content">
                  <TextWithSubtitle
                    text="Jim Deere"
                    subtitle="UI/UX Developer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="our-services">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <TextWithSubtitle
                  text="Our Services"
                  subtitle={ENVS.GENERIC_SLOGAN}
                />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="service-item">
                <h4>Synther Vaporware</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed
                  do eiusmod temp incididunt ut labore, et dolore quis ipsum
                  suspend.
                </p>
                <img src="assets/images/service-01.jpg" alt="" />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="service-item">
                <h4>Locavore Squidward</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed
                  do eiusmod temp incididunt ut labore, et dolore quis ipsum
                  suspend.
                </p>
                <img src="assets/images/service-02.jpg" alt="" />
              </div>
            </div>
            <div class="col-lg-4">
              <div class="service-item">
                <h4>Health Gothfam</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed
                  do eiusmod temp incididunt ut labore, et dolore quis ipsum
                  suspend.
                </p>
                <img src="assets/images/service-03.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeSection />
    </div>
  );
}

export default About;
