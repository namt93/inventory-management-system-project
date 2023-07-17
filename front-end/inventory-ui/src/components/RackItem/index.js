import classNames from "classnames/bind";
import styles from "./RackItem.module.scss";

const cx = classNames.bind(styles);

function RackItem({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        <h4 className={cx("name")}>{data.rack_name}</h4>
        <span className={cx("description")}>Ipac Lab | Hust C9</span>
      </div>
    </div>
  );
}

export default RackItem;
