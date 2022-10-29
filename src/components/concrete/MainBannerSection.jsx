import MakeshiftButton from "components/basic/Button";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";

const MainBannerSection = ({ leftBanner = {}, rightBanners = [] }) => {
  return (
    <div class="main-banner" id="top">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <div class="left-content">
              {
                <Thumb
                  imageURL={leftBanner.imageURL}
                  innerContent={
                    <>
                      <TextWithSubtitle
                        text={leftBanner.text}
                        subtitle={leftBanner.subtitle}
                      />
                      <MakeshiftButton
                        buttonURL={leftBanner.ctaURL}
                        buttonText={leftBanner.ctaText}
                      />
                    </>
                  }
                />
              }
            </div>
          </div>
          <div class="col-lg-6">
            <div class="right-content">
              <div class="row">
                {rightBanners.map((rightBanner) => {
                  return (
                    <div class="col-lg-6">
                      <div class="right-first-image">
                        <Thumb
                          imageURL={rightBanner.imageURL}
                          innerContent={
                            <TextWithSubtitle
                              text={rightBanner.text}
                              subtitle={rightBanner.subtitle}
                            />
                          }
                          hoverContent={
                            <>
                              <p>{rightBanner.description}</p>
                              <MakeshiftButton
                                className="main-border-button"
                                buttonURL={rightBanner.ctaURL}
                                buttonText={rightBanner.ctaText}
                              />
                            </>
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBannerSection;
