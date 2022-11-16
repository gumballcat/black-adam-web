import "styles/css/404.css";

const FourOhFour = () => {
  return (
    <div className="permission_denied">
      <div className="denied__wrapper">
        <h1>404</h1>
        <h3>
          LOST IN <span>SPACE</span> App-Name? Hmm, looks like that page doesn't
          exist.
        </h3>
        <img id="astronaut" src="assets/images/astronaut.svg" alt="" />
        <img id="planet" src="assets/images/planet.svg" alt="" />
      </div>
    </div>
  );
};

export default FourOhFour;
