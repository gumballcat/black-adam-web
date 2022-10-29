const RatingStars = ({ quantity = 0 }) => {
  const stars = [];
  for (let i = 0; i < parseInt(quantity); i++) {
    stars.push(
      <li>
        <i class="fa fa-star"></i>
      </li>
    );
  }

  return <ul class="stars">{stars}</ul>;
};

export default RatingStars;
