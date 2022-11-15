import ENVS from "common/ENVS";

const InfoGrid = () => {
  return (
    <div className="col-lg-4">
      <div className="row">
        <div className="col-6">
          <ul>
            <li>
              Store Location:
              <br />
              <span>{ENVS.STORE_LOCATION}</span>
            </li>
            <li>
              Phone:
              <br />
              <span>{ENVS.COMPANY_PHONE_NUMBER}</span>
            </li>
            <li>
              Office Location:
              <br />
              <span>{ENVS.OFFICE_LOCATION}</span>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <ul>
            <li>
              Work Hours:
              <br />
              <span>{ENVS.WORK_HOURS}</span>
            </li>
            <li>
              Email:
              <br />
              <span>{ENVS.COMPANY_EMAIL}</span>
            </li>
            <li>
              Social Media:
              <br />
              <span>
                <a href={ENVS.FACEBOOK_URL}>Facebook</a>,{" "}
                <a href={ENVS.INSTAGRAM_URL}>Instagram</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoGrid;
