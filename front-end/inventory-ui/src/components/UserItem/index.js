import classNames from "classnames/bind";
import styles from "./UserItem.module.scss";

const cx = classNames.bind(styles);

const defaultFunc = () => {};
function UserItem({ data, onClick = defaultFunc }) {
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("info")}
        onClick={() => {
          onClick(data?.username);
        }}
      >
        <h4 className={cx("name")}>{data?.username}</h4>
        <span className={cx("description")}>
          {data?.first_name} {data?.last_name}
        </span>
      </div>
    </div>
  );
}

export default UserItem;
