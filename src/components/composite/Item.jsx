import ProductButtonRow from "components/basic/ProductButtonRow";
import TextWithSubtitle from "components/basic/TextWithSubtitle";
import Thumb from "components/basic/Thumb";

const Item = ({ data }) => {
  return (
    <div className="item">
      <Thumb
        imageURL={
          data.imageURL
            ? data.imageURL
            : "https://cdn.sanity.io/images/708bnrs8/production/078f1bf4e5ab1dfc95e5b4b06128c961c8278f06-1126x1480.png?rect=0,0,1126,1479&w=300&h=394&auto=format"
        }
        hoverContent={<ProductButtonRow data={data} />}
      />
      <div className="down-content">
        <TextWithSubtitle text={data.title} subtitle={`$ ${data.price}`} />
      </div>
    </div>
  );
};

export default Item;
