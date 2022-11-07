import TextWithSubtitle from "components/basic/TextWithSubtitle";

const PageHeading = ({ id, text, subtitle }) => {
  return (
    <div class="page-heading" id={id}>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="inner-content">
              <TextWithSubtitle text={text} subtitle={subtitle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
