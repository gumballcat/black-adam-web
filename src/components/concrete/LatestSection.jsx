import TextWithSubtitle from "components/basic/TextWithSubtitle";
import "glider-js/glider.min.css";
import Glider from "react-glider";
import ProductButtonRow from "../basic/ProductButtonRow";
import RatingStars from "../basic/RatingStars";
import Thumb from "../basic/Thumb";

const LatestSection = ({ id, data = {} }) => {
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <TextWithSubtitle
                text={data.heading}
                subtitle={data.subheading}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Glider
              draggable={true}
              dragVelocity={0.75}
              hasArrows={true}
              slidesToShow={3}
              slidesToScroll={1}
            >
              {data.items.map((item) => {
                return (
                  <div className="item">
                    <Thumb
                      imageURL={item.imageURL}
                      hoverContent={<ProductButtonRow />}
                    />
                    <div className="down-content">
                      <TextWithSubtitle
                        text={item.name}
                        subtitle={`${item.price.unit} ${item.price.quantity}`}
                      />
                      <RatingStars quantity={item.rating} />
                    </div>
                  </div>
                );
              })}
            </Glider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestSection;
