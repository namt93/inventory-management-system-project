import classNames from "classnames/bind";
import styles from "./Rack.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function Rack() {
  return (
    <div className={cx("wrapper")}>
      <div className="row">
        <div className="col-sm-1">
          <h2 className={cx("page-title")}>Rack page</h2>
        </div>
        <div className={cx("col-sm-1", "offset-sm-9", "add-rack-btn")}>
          <Button to="/racks/rack/add" primary>
            Add rack
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Rack;
