import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";

function getHomeSections() {
  let ret = {};

  HELPER.HTTP.executeGet(ENDPOINTS.GET_HOME_SECTIONS).then((response) => {
    ret = response.data;
  });

  return ret;
}

function getHomeBanners() {
  return {
    primaryBanner: {
      imageURL: "assets/images/left-banner-image.jpg",
      text: "We Are the Black Adams",
      subtitle: "A Better Life Starts Here",
      ctaText: "Shop Now",
      ctaURL: "#",
    },
    categoryBanners: [
      {
        imageURL: "assets/images/baner-right-image-01.jpg",
        text: "Women",
        subtitle: "When appearance matters just as much as personality",
        description: "Every size is accounted for",
        ctaText: "Discover More",
        ctaURL: "#",
      },
      {
        imageURL: "assets/images/baner-right-image-02.jpg",
        text: "Men",
        subtitle: "No point in looking ripped when you dress like a hobo",
        description: "From Kangol hats to Cambodian flip-flops",
        ctaText: "Discover More",
        ctaURL: "#",
      },
      {
        imageURL: "assets/images/baner-right-image-03.jpg",
        text: "Men",
        subtitle: "The little rascals deserve to look cool too",
        description:
          "Kid's clothes aren't necessarily cheaper so think twice before blowing that load inside",
        ctaText: "Discover More",
        ctaURL: "#",
      },
      {
        imageURL: "assets/images/baner-right-image-04.jpg",
        text: "Accessories",
        subtitle: "When a $4000 suit just doesn't cut it",
        description:
          "Diamonds, rubies, sapphires and everything a magpie could ever dream of",
        ctaText: "Discover More",
        ctaURL: "#",
      },
    ],
  };
}

function getHomeLatests() {}

const Helper = { getHomeSections, getHomeBanners };

export default Helper;
