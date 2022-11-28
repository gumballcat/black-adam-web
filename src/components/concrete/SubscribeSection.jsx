import ENVS from "common/ENVS";
import InfoGrid from "components/basic/InfoGrid";
import TextWithSubtitle from "components/basic/TextWithSubtitle";

const SubscribeSection = () => {
  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading">
              <TextWithSubtitle
                text="By Subscribing To Our Newsletter You Can Get 30% Off"
                subtitle={ENVS.GENERIC_SLOGAN}
              />
            </div>
            {/* <BasicForm
              id="subscribe"
              method="get"
              fields={[
                {
                  name: "name",
                  type: "text",
                  id: "name",
                  placeholder: "Your Name",
                  rules: { pattern: "" },
                },
                {
                  name: "email",
                  type: "email",
                  id: "email",
                  placeholder: "Your Email",
                  rules: { pattern: "[^ @]*@[^ @]*" },
                },
              ]}
            /> */}
          </div>
          <InfoGrid />
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
