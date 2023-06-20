import classNames from "classnames/bind";
import styles from "./WarningItem.module.scss";

const cx = classNames.bind(styles);

function WarningItem({ data }) {
  const rack = {
    id: 1,
    rack_name: "A100",
    role: "master",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-26T06:06:09.982876Z",
  };

  const renderWarningDesciption = (data) => {
    if (data?.is_obstructed === true) {
      if (data?.is_skewed === true) {
        if (data?.is_overload_motor === true) {
          return "is obstructed, skewed and overload motor";
        }
      } else if (data?.is_overload_motor === true) {
        return "is obstructed and overload motor";
      }
      return "is obstructed";
    } else if (data?.is_skewed === true) {
      if (data?.is_overload_motor === true) {
        return "is skewed and overload motor";
      }
      return "is skewed";
    } else if (data?.is_overload_motor === true) {
      return "is overload motor";
    }
  };

  return (
    <div className={cx("wrapper")}>
      <a href="/racks/rack/1">
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            Rack {rack?.rack_name} {renderWarningDesciption(data)}
          </h4>
          <span className={cx("description")}>{data?.created_at}</span>
        </div>
      </a>
    </div>
  );
}

export default WarningItem;
