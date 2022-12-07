import LatestSection from "components/concrete/LatestSection";
import MainBannerSection from "components/concrete/MainBannerSection";
import SocialSection from "components/concrete/SocialSection";

const Home = () => {
  return (
    <div className="home-main">
      <MainBannerSection />
      <LatestSection />
      <SocialSection />
      {/* <SubscribeSection /> */}
    </div>
  );
};

export default Home;
