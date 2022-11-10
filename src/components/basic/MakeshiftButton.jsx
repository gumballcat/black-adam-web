import { Link } from "react-router-dom";

const MakeshiftButton = ({ buttonURL, buttonText }) => {
  return (
    <div className="main-border-button">
      <Link to={buttonURL}>{buttonText}</Link>
    </div>
  );
};

export default MakeshiftButton;
