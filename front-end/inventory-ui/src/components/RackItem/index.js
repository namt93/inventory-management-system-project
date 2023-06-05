import classNames from "classnames/bind";
import styles from "./RackItem.module.scss";

const cx = classNames.bind(styles);

function RackItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        <h4 className={cx("name")}>A100</h4>
        <span className={cx("description")}>Ipac Lab | Hust C9</span>
      </div>
    </div>
  );
}

export default RackItem;
