const Map = ({ title, src }) => {
  return (
    <div id="map">
      <iframe
        title={title}
        src={src}
        width="100%"
        height="400px"
        frameborder="0"
        style={{ border: "0" }}
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Map;
