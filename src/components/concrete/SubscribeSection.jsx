import ENVS from "common/ENVS";
import BasicForm from "components/basic/BasicForm";
import InfoGrid from "components/basic/InfoGrid";
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
                subtitle={ENVS.GENERIC_SLOGAN}
              />
            </div>
            <BasicForm
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
            />
          </div>
          <InfoGrid />
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
