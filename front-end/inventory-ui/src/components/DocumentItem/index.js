import classNames from "classnames/bind";
import styles from "./DocumentItem.module.scss";

const cx = classNames.bind(styles);

function DocumentItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        <h4 className={cx("title")}>Tin hoc Dai Cuong</h4>
        <span className={cx("author")}>HUST</span>
      </div>
    </div>
  );
}

export default DocumentItem;
