import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  faCheckCircle,
  faCircleInfo,
  faCircleXmark,
  faGauge,
  faRuler,
  faSmog,
  faTemperature2,
  faUsers,
  faWater,
  faWeightScale,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./RackStatus.module.scss";
import * as rackServices from "~/apiServices/rackServices";
import SegmentedProgressBar from "~/components/Bar/SegmentedProgressBar";
import ProgressBar from "~/components/Bar/ProgressBar";
import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";

const cx = classNames.bind(styles);

const OPERATION_ACTIONS = [
  { title: "Open The Rack" },
  { title: "Guide Light" },
  { title: "Ventilate" },
];

function RackStatus() {
  const [envStatus, setEnvStatus] = useState([]);
  const [operationActionState, setOperationActionState] =
    useState("Open The Rack");

  const params = useParams();

  const rackID = params.id;
  const tempStates = ["cold", "normal", "hot"];
  const propertyStates = ["normal", "deviant"];

  const tempStopNumbers = [10, 30, 45];
  const humidityStopNumbers = [80, 99];
  const smokeStopNumbers = [0.5, 3];
  const weightStopNumbers = [50, 99];

  const calculateStateProperty = (value = 0, stopNumbers, states) => {
    var currentState = "";
    stopNumbers.map((stopNumber, index) => {
      if (value <= stopNumber && currentState == "") {
        currentState = states[index];
      }
    });
    return currentState;
  };

  // Get lastest environment status of rack
  const getEnvStatus = async () => {
    const result = await rackServices.getRackEnvStatus(rackID);
    setEnvStatus(result.data);
  };

  const lastEnvStatus = envStatus[envStatus.length - 1];

  const temperatureState = calculateStateProperty(
    lastEnvStatus?.temperature,
    tempStopNumbers,
    tempStates
  );

  const humidityState = calculateStateProperty(
    lastEnvStatus?.humidity,
    humidityStopNumbers,
    propertyStates
  );

  const smokeState = calculateStateProperty(
    lastEnvStatus?.smoke,
    smokeStopNumbers,
    propertyStates
  );

  const weightState = calculateStateProperty(
    lastEnvStatus?.weight,
    weightStopNumbers,
    propertyStates
  );

  // Every 3s
  useEffect(() => {
    const timerId = setInterval(() => {
      getEnvStatus();
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const renderEnvStatus = () => {
    return (
      <div className={cx("display-record", "col-sm-10")}>
        <h2 className={cx("status--title")}>Environment Status</h2>
        <div className={cx("property-container")}>
          {/* Temperature section */}
          <div className={(cx("details-property"), cx("grid-item"))}>
            <div className={cx("property-content")}>
              <div className={cx("property-name")}>
                <div className={cx("property-title")}>Temperature</div>

                <i className={cx("property-icon")}>
                  <FontAwesomeIcon icon={faTemperature2} />
                </i>
              </div>
              <div className={cx("property-value")}>
                <h2>
                  {lastEnvStatus?.temperature ? lastEnvStatus.temperature : 0}
                  &deg;C
                </h2>
                <div className={cx("property-state")}>
                  {temperatureState ? temperatureState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={
                    lastEnvStatus?.temperature ? lastEnvStatus.temperature : 0
                  }
                  stopNumbers={tempStopNumbers}
                  colors={[
                    "rgb(0,150,1)",
                    "rgb(210,210,0)",
                    "rgb(200, 100, 20)",
                  ]}
                  states={tempStates}
                />
              </div>
            </div>
          </div>
          {/* Humidity section */}
          <div className={(cx("details-property"), cx("grid-item"))}>
            <div className={cx("property-content")}>
              <div className={cx("property-name")}>
                <div className={cx("property-title")}>Humidity</div>

                <i className={cx("property-icon")}>
                  <FontAwesomeIcon icon={faWater} />
                </i>
              </div>

              <div className={cx("property-value")}>
                <h2>{lastEnvStatus?.humidity ? lastEnvStatus.humidity : 0}%</h2>
                <div className={cx("property-state")}>
                  {humidityState ? humidityState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={
                    lastEnvStatus?.humidity ? lastEnvStatus.humidity : 0
                  }
                  stopNumbers={humidityStopNumbers}
                  colors={["rgb(0,150,1)", "rgb(200, 100, 20)"]}
                  states={propertyStates}
                />
              </div>
            </div>
          </div>
          {/* Smoke section */}
          <div className={(cx("details-property"), cx("grid-item"))}>
            <div className={cx("property-content")}>
              <div className={cx("property-name")}>
                <div className={cx("property-title")}>Smoke</div>

                <i className={cx("property-icon")}>
                  <FontAwesomeIcon icon={faSmog} />
                </i>
              </div>
              <div className={cx("property-value")}>
                <h2 className={cx("smoke-value")}>
                  {lastEnvStatus?.smoke ? lastEnvStatus.smoke : 0}
                </h2>
                <div className={cx("property-state")}>
                  {smokeState ? smokeState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={lastEnvStatus?.smoke ? lastEnvStatus.smoke : 0}
                  stopNumbers={smokeStopNumbers}
                  colors={["rgb(0,150,1)", "rgb(200, 100, 20)"]}
                  states={propertyStates}
                />
              </div>
            </div>
          </div>
          {/* Weight section */}
          <div className={(cx("details-property"), cx("grid-item"))}>
            <div className={cx("property-content")}>
              <div className={cx("property-name")}>
                <div className={cx("property-title")}>Weight</div>

                <i className={cx("property-icon")}>
                  <FontAwesomeIcon icon={faWeightScale} />
                </i>
              </div>
              <div className={cx("property-value")}>
                <h2>{lastEnvStatus?.weight ? lastEnvStatus.weight : 0}kg</h2>
                <div className={cx("property-state")}>
                  {weightState ? weightState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={lastEnvStatus?.weight ? lastEnvStatus.weight : 0}
                  stopNumbers={weightStopNumbers}
                  colors={["rgb(0,150,1)", "rgb(200, 100, 20)"]}
                  states={propertyStates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // lasted operation status of rack
  const lastOperationStatus = {
    movement_speed: 10,
    displacement: 12,
    number_users: 2,
    is_hard_locked: false,
    is_end_point: false,
  };

  const speedStates = ["slow", "normal", "fast"];

  const speedStopNumbers = [3, 10, 16];

  const renderOperationStatus = () => {
    return (
      <div className={cx("operation-container")}>
        <div className={cx("row")}>
          <h2 className={cx("status--title", "col-sm-2")}>Operation Status</h2>
          <div className={cx("status--title", "col-sm-2", "offset-sm-7")}>
            <div className={cx("operation-actions")}>
              <div>
                <Menu
                  items={OPERATION_ACTIONS}
                  sizeList="size-list-small-2"
                  onChange={setOperationActionState}
                  offset={[-40, -202]}
                >
                  <button className={cx("operation-actions-item")}>
                    <div className={cx("operation-actions-item-title")}>
                      {operationActionState}
                    </div>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className={cx("caret-down-icon")}
                    />
                  </button>
                </Menu>
              </div>
              <div className={cx("start-operation-btn")}>
                <Button to="/" primary normal>
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("display-record", "col-sm-11")}>
          <div className={cx("property-container")}>
            {/* Speed section */}
            <div className={(cx("details-property"), cx("grid-item"))}>
              <div className={cx("property-content")}>
                <div className={cx("property-name")}>
                  <div className={cx("property-title")}>Speed</div>

                  <i className={cx("property-icon")}>
                    <FontAwesomeIcon icon={faGauge} />
                  </i>
                </div>
                <div className={cx("property-value")}>
                  <h2>
                    {lastOperationStatus?.movement_speed
                      ? lastOperationStatus.movement_speed
                      : 0}
                    cm/s
                  </h2>
                  <div className={cx("property-state")}>
                    {temperatureState ? temperatureState : "normal"}
                  </div>
                </div>
                <div className={cx("property-display")}>
                  <SegmentedProgressBar
                    completed={
                      lastOperationStatus?.movement_speed
                        ? lastOperationStatus.movement_speed
                        : 0
                    }
                    stopNumbers={speedStopNumbers}
                    colors={[
                      "rgb(210,210,0)",
                      "rgb(0,150,1)",
                      "rgb(200, 100, 20)",
                    ]}
                    states={speedStates}
                  />
                </div>
              </div>
            </div>

            {/* Displacement section */}
            <div className={(cx("details-property"), cx("grid-item"))}>
              <div className={cx("property-content")}>
                <div className={cx("property-name")}>
                  <div className={cx("property-title")}>Displacement</div>

                  <i className={cx("property-icon")}>
                    <FontAwesomeIcon icon={faRuler} />
                  </i>
                </div>
                <div className={cx("property-value")}>
                  <h2>
                    {lastOperationStatus?.displacement
                      ? lastOperationStatus.displacement
                      : 0}
                    cm
                  </h2>
                  <div className={cx("property-state")}>
                    {temperatureState ? temperatureState : "normal"}
                  </div>
                </div>
                <div className={cx("displacement-display")}>
                  <ProgressBar
                    completed={
                      lastOperationStatus?.displacement
                        ? lastOperationStatus.displacement
                        : 20
                    }
                  />
                </div>
              </div>
            </div>

            {/* Number users section */}
            <div className={(cx("details-property"), cx("grid-item"))}>
              <div className={cx("property-content")}>
                <div className={cx("property-name")}>
                  <div className={cx("property-title")}>Users</div>

                  <i className={cx("property-icon")}>
                    <FontAwesomeIcon icon={faUsers} />
                  </i>
                </div>
                <div className={cx("users-property-value")}>
                  <h2>
                    {lastOperationStatus?.number_users
                      ? lastOperationStatus.number_users
                      : 0}
                  </h2>
                  <div className={cx("users-property-state")}>working</div>
                </div>
              </div>
            </div>

            {/* Others section */}
            <div className={(cx("details-property"), cx("grid-item"))}>
              <div className={cx("property-content")}>
                <div className={cx("property-name")}>
                  <div className={cx("property-title")}>Others</div>

                  <i className={cx("property-icon")}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </i>
                </div>
                <div className={cx("others-property-display")}>
                  <div className={cx("property-name")}>
                    <div className={cx("property-title")}>Hard Lock</div>
                    {lastOperationStatus?.is_hard_locked ? (
                      <i className={cx("property-icon")}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </i>
                    ) : (
                      <i className={cx("property-icon")}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </i>
                    )}
                  </div>
                  <div className={cx("property-name")}>
                    <div className={cx("property-title")}>Endpoint</div>
                    {lastOperationStatus?.is_end_point ? (
                      <i className={cx("property-icon")}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </i>
                    ) : (
                      <i className={cx("property-icon")}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div>Rack ID: {rackID}</div>
      <div className={cx("row")}>{renderEnvStatus()}</div>
      <div className={cx("row")}>{renderOperationStatus()}</div>
    </div>
  );
}

export default RackStatus;
