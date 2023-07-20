import classNames from "classnames/bind";
import styles from "./RackGroupItem.module.scss";
import * as rackServices from "~/apiServices/rackServices";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const defaultFunc = () => {};
function RackGroupItem({
  data,
  onClick = defaultFunc,
  to,
  href,
  ...passProps
}) {
  // const [rackGroupResponse, setRackGroupResponse] = useState();

  // const getRackGroupByID = async (rackGroupID) => {
  //   const result = await rackServices.getRackGroupByID(rackGroupID);
  //   setRackGroupResponse(result);
  //   return result;
  // };

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

  return (
    <div className={cx("wrapper")}>
      <Component
        onClick={() => {
          onClick(data?.location + " | " + data?.description);
        }}
        {...props}
      >
        <div className={cx("info")}>
          <h4 className={cx("name")}>
            {data.location} {" | "} {data?.description}
          </h4>
        </div>
      </Component>
    </div>
  );
}

export default RackGroupItem;
