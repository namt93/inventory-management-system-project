import classNames from "classnames/bind";
import styles from "./UserItem.module.scss";

const cx = classNames.bind(styles);

function UserItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        <h4 className={cx("name")}>Namt93</h4>
        <span className={cx("description")}>Nam Tran</span>
      </div>
    </div>
  );
}

export default UserItem;
