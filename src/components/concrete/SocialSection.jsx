import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";
import ENVS from "../../common/ENVS";

const SocialSection = () => {
  const platforms = [
    {
      title: "Fashion",
      imageURL: "assets/images/instagram-01.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
    {
      title: "New",
      imageURL: "assets/images/instagram-02.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
    {
      title: "Brand",
      imageURL: "assets/images/instagram-03.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
    {
      title: "Makeup",
      imageURL: "assets/images/instagram-04.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
    {
      title: "Leather",
      imageURL: "assets/images/instagram-05.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
    {
      title: "Bag",
      imageURL: "assets/images/instagram-06.jpg",
      url: "http://instagram.com",
      icon: "fa fa-instagram",
    },
  ];

  return (
    <section className="section" id="social">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <TextWithSubtitle
                text="Social Media"
                subtitle={`Details to details is what makes ${ENVS.COMPANY_NAME} different
                from the other themes.`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row images">
          {platforms.map((platform) => {
            return (
              <div className="col-2" key={platform.title}>
                <Thumb
                  imageURL={platform.imageURL}
                  icon={
                    <a href={platform.url}>
                      <h6>{platform.title}</h6>
                      <i className={platform.icon}></i>
                    </a>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
