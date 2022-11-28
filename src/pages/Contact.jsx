import ENVS from "common/ENVS";
import Map from "components/basic/Map";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import SubscribeSection from "components/concrete/SubscribeSection";

const Contact = () => {
  return (
    <div className="contact-main">
      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <TextWithSubtitle
                  text="Contact Us"
                  subtitle="Voice Up, Be Heard"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <Map
                title="officeLocation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90186.37207676383!2d-80.13495239500924!3d25.9317678710111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad1877e4a82d%3A0xa891714787d1fb5e!2sPier%20Park!5e1!3m2!1sen!2sth!4v1637512439384!5m2!1sen!2sth"
              />
            </div>
            <div className="col-lg-6">
              <div className="section-heading">
                <TextWithSubtitle
                  text="Say Hello. Don't Be Shy!"
                  subtitle={`Details to details is what makes ${ENVS.COMPANY_NAME} different
                  from the other themes.`}
                />
              </div>
              {/* <BasicForm
                id="contact"
                method="post"
                fields={[
                  {
                    name: "name",
                    type: "text",
                    id: "name",
                    placeholder: "Your Name",
                  },
                  {
                    name: "email",
                    type: "email",
                    id: "email",
                    placeholder: "Your Email",
                    rules: { pattern: "[^ @]*@[^ @]*" },
                  },
                  {
                    name: "message",
                    type: "textarea",
                    id: "message",
                    placeholder: "Your Message",
                    styles: { rows: "6" },
                  },
                ]}
              /> */}
            </div>
          </div>
        </div>
      </div>

      <SubscribeSection />
    </div>
  );
};

export default Contact;
