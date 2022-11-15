const RatingStars = ({ quantity = 0 }) => {
  const stars = [];
  for (let i = 0; i < parseInt(quantity); i++) {
    stars.push(
      <li key={i}>
        <i className="fa fa-star"></i>
      </li>
    );
  }

  return <ul className="stars">{stars}</ul>;
};

export default RatingStars;
