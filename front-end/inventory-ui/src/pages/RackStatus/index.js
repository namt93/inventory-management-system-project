import classNames from "classnames/bind";
import styles from "./RackStatus.module.scss";

import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function RackStatus() {
  const params = useParams();

  const rackID = params.id;
  return (
    <div className={cx("wrapper")}>
      <div>Rack ID: {rackID}</div>
    </div>
  );
}

export default RackStatus;
