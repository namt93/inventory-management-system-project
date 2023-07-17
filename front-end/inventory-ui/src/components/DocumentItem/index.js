import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./DocumentItem.module.scss";

const cx = classNames.bind(styles);

function DocumentItem({ data }) {
  return (
    <div className={cx("wrapper")}>
      <Link to={`/racks/rack/${data.rack_id}`}>
        <div className={cx("info")}>
          <h4 className={cx("title")}>
            {data.title} {", "} {data.author}
          </h4>
          <span className={cx("rack-id")}>Rack {data.rack_id}</span>
        </div>
      </Link>
    </div>
  );
}

export default DocumentItem;
