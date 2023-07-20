import classNames from "classnames/bind";
import styles from "./RackAdd.module.scss";
import SearchRackGroup from "~/components/Layout/components/Search/SearchRackGroup";
import Button from "~/components/Button";
import SearchUser from "~/components/Layout/components/Search/SearchUser";
import * as rackServices from "~/apiServices/rackServices";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function RackAdd() {
  const [rackConfig, setRackConfig] = useState({
    rack_name: "",
    role: "",
    rack_group: null,
    user: null,
    password: "",
  });

  const navigator = useNavigate();
  const rackGroupInputRef = useRef();
  const managerInputRef = useRef();
  const rackNameInputRef = useRef();

  //   when author config is typing
  useEffect(() => {
    getRackManagerInformation();
  }, [rackNameInputRef.current?.value]);

  const getRackManagerInformation = async () => {
    if (
      typeof rackGroupInputRef.current?.getRackGroupInput() === "string" &&
      typeof managerInputRef.current?.getManagerInput() === "string"
    ) {
      const rackGroupArray = rackGroupInputRef.current
        ?.getRackGroupInput()
        .split(" | ");
      const location = rackGroupArray[0];
      const description = rackGroupArray[1];
      if (!!location && !!description) {
        const response = await Promise.all([
          rackServices.getRackGroupByLocationDescription(location, description),
          rackServices.getSearchUsers(
            managerInputRef.current?.getManagerInput()
          ),
        ]);

        if (response.length > 1) {
          setRackConfig({
            ...rackConfig,
            rack_group: response[0][0]?.id,
            user: response[1][0]?.id,
          });
        }
      }
    }
  };

  const handleSubmit = async () => {
    rackServices.postRacks(rackConfig);
    alert("Data Posted Successfully");
    navigator("/");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-title")}>Add Rack</div>

      {/* Rack Group config */}
      <div className={cx("row", "rack-config")}>
        <div className={cx("col-sm-1", "config-title")}>Rack Group:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <div>
            <SearchRackGroup ref={rackGroupInputRef}></SearchRackGroup>
          </div>
        </div>
      </div>

      {/* Created by config */}
      <div className={cx("row", "manager-config")}>
        <div className={cx("col-sm-1", "config-title")}>Created by:</div>
        <div className={cx("col-sm-1", "offset-sm-1", "config-value")}>
          <SearchUser ref={managerInputRef}></SearchUser>
        </div>
      </div>

      {/* Rack name config */}
      <div className={cx("row", "rack-name-config")}>
        <div className={cx("col-sm-1", "config-title")}>Rack name:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            ref={rackNameInputRef}
            onChange={(e) =>
              setRackConfig({
                ...rackConfig,
                rack_name: e.target.value,
              })
            }
          ></input>
        </div>
      </div>

      {/* Password config */}
      <div className={cx("row", "password-config")}>
        <div className={cx("col-sm-1", "config-title")}>Password:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            onChange={(e) =>
              setRackConfig({ ...rackConfig, password: e.target.value })
            }
          ></input>
        </div>
      </div>

      {/* Role config */}
      <div className={cx("row", "role-config")}>
        <div className={cx("col-sm-1", "config-role")}>Role:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            onChange={(e) =>
              setRackConfig({ ...rackConfig, role: e.target.value })
            }
          ></input>
        </div>
      </div>

      <div className={cx("row", "save-btn")}>
        <div className={cx("col-sm-1", "offset-sm-11")}>
          <Button forthblue normal onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RackAdd;
