import { useState } from "react";
import "styles/scss/Quantity.scss";

const Quantity = ({ callbackWithValue }) => {
  const [value, setValue] = useState(1);

  const increment = () => {
    setValue((prevValue) => {
      let ret = prevValue + 1;
      callbackWithValue(ret);
      return ret;
    });
  };

  const decrement = () => {
    setValue((prevValue) => {
      let ret = prevValue > 1 ? prevValue - 1 : 1;
      callbackWithValue(ret);
      return ret;
    });
  };

  return (
    <div>
      <div className="quantity-input">
        <input type="button" value="-" className="minus" onClick={decrement} />
        <input
          className="quantity-input__screen"
          type="text"
          value={value}
          readonly
        />
        <input type="button" value="+" class="plus" onClick={increment} />
      </div>
    </div>
  );
};

export default Quantity;
