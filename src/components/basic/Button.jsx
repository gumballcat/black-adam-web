const MakeshiftButton = ({ buttonURL, buttonText }) => {
  return (
    <div className="main-border-button">
      <a href={buttonURL}>{buttonText}</a>
    </div>
  );
};

export default MakeshiftButton;
