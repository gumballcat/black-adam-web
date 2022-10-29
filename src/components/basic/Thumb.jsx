const Thumb = ({
  imageURL = "assets/images/default-no-image.png",
  innerContent,
  hoverContent,
}) => {
  return (
    <div className="thumb">
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
