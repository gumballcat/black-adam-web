const BasicForm = ({ id, action, method, fields = [] }) => {
  return (
    <form id={id} action={action} method={method}>
      <div className="row">
        {fields.map((field) => {
          let fieldProps = {
            name: field.name,
            type: field.type,
            id: field.id,
            placeholder: field.placeholder,
          };

          if (field.rules.pattern) {
            fieldProps["pattern"] = field.rules.pattern;
          }
          if (field.rules.required) {
            fieldProps["required"] = field.rules.required;
          }

          return (
            <div className="col-lg-5">
              <fieldset>
                <input {...fieldProps} />
              </fieldset>
            </div>
          );
        })}
        <div className="col-lg-2">
          <fieldset>
            <button type="submit" id="form-submit" className="main-dark-button">
              <i className="fa fa-paper-plane"></i>
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
