import ProductButtonRow from "components/basic/ProductButtonRow";
import RatingStars from "components/basic/RatingStars";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";

const Item = ({ data }) => {
  return (
    <div className="item">
      <Thumb imageURL={data.imageURL} hoverContent={<ProductButtonRow />} />
      <div className="down-content">
        <TextWithSubtitle
          text={data.name}
          subtitle={`${data.price.unit} ${data.price.quantity}`}
        />
        <RatingStars quantity={data.rating} />
      </div>
    </div>
  );
};

export default Item;
