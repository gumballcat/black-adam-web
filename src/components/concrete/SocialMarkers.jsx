import ENVS from "common/ENVS";

const SocialMarkers = () => {
  return (
    <ul>
      <li>
        <a href={ENVS.FACEBOOK_URL}>
          <i class="fa fa-facebook"></i>
        </a>
      </li>
      <li>
        <a href={ENVS.INSTAGRAM_URL}>
          <i class="fa fa-instagram"></i>
        </a>
      </li>
    </ul>
  );
};

export default SocialMarkers;
