import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Item from "components/composite/Item";
import "glider-js/glider.min.css";
import Glider from "react-glider";

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
                return <Item key={item.id} data={item} />;
              })}
            </Glider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestSection;
