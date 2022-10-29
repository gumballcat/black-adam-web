import ENVS from "common/ENVS";
import TextWithSubtitle from "components/basic/TextWithSubtitle";

const SubscribeSection = () => {
  return (
    <div class="subscribe">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-heading">
              <TextWithSubtitle
                text="By Subscribing To Our Newsletter You Can Get 30% Off"
                subtitle={`Details to details is what makes ${ENVS.COMPANY_NAME} different
                from the other themes.`}
              />
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
  );
};

export default SubscribeSection;
