import ENDPOINTS from "common/ENDPOINTS";
import ENUMS from "common/ENUMS";
import HELPER from "common/HELPER";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Item from "components/composite/Item";
import "glider-js/glider.min.css";
import { useEffect, useState } from "react";
import Glider from "react-glider";

const LatestSection = () => {
  const [menItems, setMenItems] = useState([]);
  const [womenItems, setWomenItems] = useState([]);
  const [kidsItems, setKidsItems] = useState([]);

  const sections = [
    {
      id: "men",
      heading: "Men",
      subheading: "Our latest collection for the guys",
      items: menItems,
    },
    {
      id: "women",
      heading: "Women",
      subheading: "Our latest collection for the ladies",
      items: womenItems,
    },
    {
      id: "kids",
      heading: "Kids",
      subheading: "Our latest collection for the little guys",
      items: kidsItems,
    },
  ];

  useEffect(() => {
    HELPER.HTTP.executeGet(ENDPOINTS.GET_LATEST_PRODUCTS).then((response) => {
      let iMenItems = [];
      let iWomenItems = [];
      let iKidsItems = [];

      response.content.forEach((item) => {
        item.categoryIds.forEach((categoryId) => {
          switch (categoryId) {
            case ENUMS.CATEGORY.MEN.id:
              iMenItems.push(item);
              break;
            case ENUMS.CATEGORY.WOMEN.id:
              iWomenItems.push(item);
              break;
            case ENUMS.CATEGORY.KIDS.id:
              iKidsItems.push(item);
              break;
            default:
          }
        });

        setMenItems([...iMenItems]);
        setWomenItems([...iWomenItems]);
        setKidsItems([...iKidsItems]);
      });
    });
  }, []);

  return sections.map((section) => (
    <section className="section" key={section.id} id={section.id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <TextWithSubtitle
                text={section.heading}
                subtitle={section.subheading}
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
              {section.items.map((item) => {
                return <Item key={item.id} data={item} />;
              })}
            </Glider>
          </div>
        </div>
      </div>
    </section>
  ));
};

export default LatestSection;
