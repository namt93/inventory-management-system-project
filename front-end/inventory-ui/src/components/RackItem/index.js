import classNames from "classnames/bind";
import styles from "./RackItem.module.scss";
import * as rackServices from "~/apiServices/rackServices";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const defaultFunc = () => {};
function RackItem({ data, onClick = defaultFunc, to, href, ...passProps }) {
  const [rackGroupResponse, setRackGroupResponse] = useState();

  const getRackGroupByID = async (rackGroupID) => {
    const result = await rackServices.getRackGroupByID(rackGroupID);
    setRackGroupResponse(result);
    return result;
  };

  let Component = "div";

  const props = {
    ...passProps,
  };

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }
  // rerender whenever data change
  useEffect(() => {
    getRackGroupByID(data.rack_group);
  }, [data]);

  return (
    <div className={cx("wrapper")}>
      <Component
        onClick={() => {
          onClick(data?.rack_name);
        }}
        {...props}
      >
        <div className={cx("info")}>
          <h4 className={cx("name")}>{data.rack_name}</h4>
          <span className={cx("description")}>
            {rackGroupResponse?.location} {"| "}{" "}
            {rackGroupResponse?.description}{" "}
          </span>
        </div>
      </Component>
    </div>
  );
}

export default RackItem;
