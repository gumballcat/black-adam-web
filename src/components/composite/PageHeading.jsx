import TextWithSubtitle from "components/basic/TextWithSubtitle";

const PageHeading = ({ id, text, subtitle }) => {
  return (
    <div className="page-heading" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-content">
              <TextWithSubtitle text={text} subtitle={subtitle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
