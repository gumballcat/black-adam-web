const Thumb = ({
  imageURL = "assets/images/default-no-image.png",
  icon,
  innerContent,
  hoverContent,
}) => {
  return (
    <div className="thumb">
      {icon ? <div className="icon">{icon}</div> : ""}
      {innerContent ? <div className="inner-content">{innerContent}</div> : ""}
      {hoverContent ? (
        <div className="hover-content">
          <div className="inner">{hoverContent}</div>
        </div>
      ) : (
        ""
      )}
      <img src={imageURL} alt="" />
    </div>
  );
};

export default Thumb;
