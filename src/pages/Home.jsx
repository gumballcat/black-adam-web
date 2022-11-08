import ENDPOINTS from "common/ENDPOINTS";
import HELPER from "common/HELPER";
import Preloader from "components/basic/Preloader";
import LatestSection from "components/concrete/LatestSection";
import MainBannerSection from "components/concrete/MainBannerSection";
import SocialSection from "components/concrete/SocialSection";
import SubscribeSection from "components/concrete/SubscribeSection";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeSections, setHomeSections] = useState([]);

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_HOME_SECTIONS).then((response) => {
      setHomeSections(response.content);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="home-main">
      {isLoading ? (
        <Preloader />
      ) : (
        homeSections.map((homeSection) => {
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
        })
      )}
      <SocialSection />
      <SubscribeSection />
    </div>
  );
};

export default Home;
