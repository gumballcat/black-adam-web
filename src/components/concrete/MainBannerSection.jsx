import ROUTES from "common/ROUTES";
import MakeshiftButton from "components/basic/MakeshiftButton";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";

const MainBannerSection = () => {
  const banners = [
    {
      imageURL: "assets/images/baner-right-image-01.jpg",
      text: "Women",
      subtitle: "When appearance matters just as much as personality",
      description: "Every size is accounted for",
      ctaText: "Discover More",
      ctaURL: ROUTES.WOMEN_PRODUCTS,
    },
    {
      imageURL: "assets/images/baner-right-image-02.jpg",
      text: "Men",
      subtitle: "No point in looking ripped when you dress like a hobo",
      description: "From Kangol hats to Cambodian flip-flops",
      ctaText: "Discover More",
      ctaURL: ROUTES.MEN_PRODUCTS,
    },
    {
      imageURL: "assets/images/baner-right-image-03.jpg",
      text: "Kids",
      subtitle: "The little rascals deserve to look cool too",
      description:
        "Kid's clothes aren't necessarily cheaper so think twice before blowing that load inside",
      ctaText: "Discover More",
      ctaURL: ROUTES.KIDS_PRODUCTS,
    },
    {
      imageURL: "assets/images/baner-right-image-04.jpg",
      text: "Accessories",
      subtitle: "When a $4,000 suit just doesn't cut it",
      description:
        "Diamonds, rubies, sapphires and everything a magpie could ever dream of",
      ctaText: "Coming Soon",
      ctaURL: "",
    },
  ];

  return (
    <div className="main-banner" id="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="left-content">
              {
                <Thumb
                  imageURL="assets/images/left-banner-image.jpg"
                  innerContent={
                    <>
                      <TextWithSubtitle
                        text="We Are the Black Adams"
                        subtitle="A Better Life Starts Here"
                      />
                      <MakeshiftButton
                        buttonURL="/products"
                        buttonText="Shop Now"
                      />
                    </>
                  }
                />
              }
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                {banners.map((rightBanner) => {
                  return (
                    <div className="col-lg-6" key={rightBanner.text}>
                      <div className="right-first-image">
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
