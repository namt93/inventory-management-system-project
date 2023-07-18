import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./DocumentItem.module.scss";

const cx = classNames.bind(styles);

const defaultFunc = () => {};
function DocumentItem({ data, onClick = defaultFunc }) {
  return (
    <div className={cx("wrapper")}>
      <Link to={`/documents/${data.id}`} onClick={onClick}>
        <div className={cx("info")}>
          <h4 className={cx("title")}>
            {data.title} {"| "} {data.author}
          </h4>
          <span className={cx("rack-id")}>Rack {data.rack_id}</span>
        </div>
      </Link>
    </div>
  );
}

export default DocumentItem;
