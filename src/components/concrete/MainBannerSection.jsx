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
      ctaURL: "/products/women",
    },
    {
      imageURL: "assets/images/baner-right-image-02.jpg",
      text: "Men",
      subtitle: "No point in looking ripped when you dress like a hobo",
      description: "From Kangol hats to Cambodian flip-flops",
      ctaText: "Discover More",
      ctaURL: "/products/men",
    },
    {
      imageURL: "assets/images/baner-right-image-03.jpg",
      text: "Kids",
      subtitle: "The little rascals deserve to look cool too",
      description:
        "Kid's clothes aren't necessarily cheaper so think twice before blowing that load inside",
      ctaText: "Discover More",
      ctaURL: "/products/kids",
    },
    {
      imageURL: "assets/images/baner-right-image-04.jpg",
      text: "Accessories",
      subtitle: "When a $4,000 suit just doesn't cut it",
      description:
        "Diamonds, rubies, sapphires and everything a magpie could ever dream of",
      ctaText: "Discover More",
      ctaURL: "/products/accessories",
    },
  ];

  return (
    <div class="main-banner" id="top">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <div class="left-content">
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
          <div class="col-lg-6">
            <div class="right-content">
              <div class="row">
                {banners.map((rightBanner) => {
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
