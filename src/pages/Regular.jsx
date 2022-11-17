import FourOhFour from "pages/404";
import { useSelector } from "react-redux";

const Regular = () => {
  const account = useSelector((state) => state.account);

  if (account.auth === 0 || account.info.type !== "regular") {
    return <FourOhFour />;
  }
};

export default Regular;
