const BasicForm = ({ id, onSubmit, method, fields = [] }) => {
  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      method={method}
    >
      <div className="row">
        {fields.map((field) => {
          return field.type === "textarea" ? (
            <div className="col-lg-12" key={field.id}>
              <textarea
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                {...field.styles}
                {...field.rules}
              ></textarea>
            </div>
          ) : (
            <div className="col-lg-5" key={field.id}>
              <fieldset>
                <input
                  name={field.name}
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  {...field.styles}
                  {...field.rules}
                />
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
