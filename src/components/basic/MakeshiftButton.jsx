import { Link } from "react-router-dom";

const MakeshiftButton = ({ buttonURL, buttonText, onClick }) => {
  return (
    <div className="main-border-button">
      <Link to={buttonURL} onClick={onClick}>{buttonText}</Link>
    </div>
  );
};

export default MakeshiftButton;
