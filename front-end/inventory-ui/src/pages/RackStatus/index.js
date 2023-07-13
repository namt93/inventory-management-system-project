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
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import classNames from "classnames/bind";
import styles from "./RackStatus.module.scss";
import * as rackServices from "~/apiServices/rackServices";
import SegmentedProgressBar from "~/components/Bar/SegmentedProgressBar";
import ProgressBar from "~/components/Bar/ProgressBar";
import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";

const cx = classNames.bind(styles);

const OPERATION_ACTIONS_CLOSED_RACKS = [
  { title: "Open The Rack" },
  { title: "Guide Light" },
  { title: "Ventilate" },
];

const OPERATION_ACTIONS_OPENED_RACKS = [
  { title: "Close The Rack" },
  { title: "Guide Light" },
  { title: "Ventilate" },
];

// Reset default ChartJs
ChartJs.defaults.color = "#e6edf3";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

function RackStatus() {
  const [status, setStatus] = useState([]);
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

  const rack = {
    id: 1,
    rack_name: "A100",
    role: "master",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-26T06:06:09.982876Z",
  };

  const user = {
    id: 1,
    username: "admin",
    first_name: "",
    last_name: "",
    date_joined: "2023-05-26T05:58:16Z",
  };

  const breakdownStatus = [
    {
      id: 1,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: false,
      created_at: "2023-05-29T11:51:22.773868Z",
    },
    {
      id: 2,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: null,
      created_at: "2023-05-29T11:51:38.616072Z",
    },
    {
      id: 3,
      rack: 1,
      is_obstructed: false,
      is_skewed: true,
      is_overload_motor: true,
      created_at: "2023-06-20T09:42:32.424094Z",
    },
    {
      id: 4,
      rack: 1,
      is_obstructed: false,
      is_skewed: false,
      is_overload_motor: true,
      created_at: "2023-06-20T09:43:16.967121Z",
    },
    {
      id: 5,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: false,
      created_at: "2023-06-20T09:43:31.863500Z",
    },
    {
      id: 6,
      rack: 1,
      is_obstructed: true,
      is_skewed: true,
      is_overload_motor: false,
      created_at: "2023-06-20T09:43:38.815377Z",
    },
    {
      id: 7,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: false,
      created_at: "2023-06-20T09:44:36.212335Z",
    },
    {
      id: 8,
      rack: 1,
      is_obstructed: false,
      is_skewed: false,
      is_overload_motor: true,
      created_at: "2023-06-20T09:44:48.370736Z",
    },
    {
      id: 9,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: false,
      created_at: "2023-06-20T09:45:00.141245Z",
    },
    {
      id: 10,
      rack: 1,
      is_obstructed: true,
      is_skewed: false,
      is_overload_motor: false,
      created_at: "2023-06-20T09:45:03.114599Z",
    },
  ];

  const rackGroup = {
    id: 1,
    location: "Hust C9",
    description: "ipac lab: tin hoc dai cuong",
    user: 1,
    created_at: "2023-05-26T06:05:37.677537Z",
  };

  const calculateStateProperty = (value = 0, stopNumbers, states) => {
    var currentState = "";
    stopNumbers.map((stopNumber, index) => {
      if (value <= stopNumber && currentState == "") {
        currentState = states[index];
      }
    });
    return currentState;
  };

  // Get lastest environment, operation status of rack
  const getStatus = async () => {
    const response = await Promise.all([
      rackServices.getRackEnvStatus(rackID),
      rackServices.getRackLatestOperationStatus(rackID),
    ]);

    setStatus(response);
  };

  const lastEnvStatus = status[0]?.data[status[0]?.data.length - 1];
  const lastOperationStatus = status[1]?.data;

  // define state of environment status properties
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

  // Count faults of Breakdown Status
  function countObstructedFaults(accumulator, currentValue) {
    if (currentValue?.is_obstructed === true) {
      return accumulator + 1;
    }
    return accumulator;
  }

  function countSkewedFaults(accumulator, currentValue) {
    if (currentValue?.is_skewed === true) {
      return accumulator + 1;
    }
    return accumulator;
  }

  function countOverloadMotorFaults(accumulator, currentValue) {
    if (currentValue?.is_overload_motor === true) {
      return accumulator + 1;
    }
    return accumulator;
  }

  var totalObstructedFaults = breakdownStatus.reduce(countObstructedFaults, 0);
  var totalSkewedFaults = breakdownStatus.reduce(countSkewedFaults, 0);
  var totalOverloadMotorFaults = breakdownStatus.reduce(
    countOverloadMotorFaults,
    0
  );

  var totalFaultsArray = [];
  totalFaultsArray.push(
    totalObstructedFaults,
    totalSkewedFaults,
    totalOverloadMotorFaults
  );

  // Every 1s
  useEffect(() => {
    const timerId = setInterval(() => {
      getStatus();
    }, 500);

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
                  colors={["green", "darkorange", "darkred"]}
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

  //operation status of rack
  const speedStates = ["slow", "normal", "fast"];

  const speedStopNumbers = [3, 10, 16];

  // define state of speed of operation status
  const speedState = calculateStateProperty(
    lastOperationStatus?.movement_speed,
    speedStopNumbers,
    speedStates
  );

  // displacement
  const calculateDisplacementCompleted = (number = 0) => {
    return (number / 64) * 100;
  };

  const displacementCompletedNumber = calculateDisplacementCompleted(
    lastOperationStatus?.displacement
  );

  if (
    lastOperationStatus?.displacement === 64 &&
    operationActionState === "Open The Rack"
  ) {
    setOperationActionState("Close The Rack");
  }
  if (
    lastOperationStatus?.displacement === 0 &&
    operationActionState === "Close The Rack"
  ) {
    setOperationActionState("Open The Rack");
  }

  const OPERATION_ACTIONS =
    operationActionState === "Open The Rack"
      ? OPERATION_ACTIONS_CLOSED_RACKS
      : OPERATION_ACTIONS_OPENED_RACKS;

  const startOperation = () => {
    if (operationActionState === "Open The Rack") {
      rackServices.postOpenRackOperationToIPC(rackID);
    }
    if (operationActionState === "Close The Rack") {
      rackServices.postCloseRackOperationToIPC(rackID);
    }
    if (operationActionState === "Guide Light") {
      rackServices.postGuideLightOperationToIPC(rackID);
    }
    if (operationActionState === "Ventilate") {
      rackServices.postVentilateOperationToIPC(rackID);
    }
  };

  // console.log("[OPERATION_ACTIONS]");
  // console.log(OPERATION_ACTIONS);

  const renderOperationStatus = () => {
    return (
      <div className={cx("operation-container")}>
        <div className={cx("row")}>
          <h2 className={cx("status--title", "col-sm-2")}>Operation Status</h2>
          <div className={cx("status--title", "col-sm-2", "offset-sm-7")}>
            <div className={cx("operation-actions")}>
              <div>
                <Menu
                  items={
                    OPERATION_ACTIONS
                      ? OPERATION_ACTIONS
                      : OPERATION_ACTIONS_CLOSED_RACKS
                  }
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
                <Button primary normal onClick={startOperation}>
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
                    {speedState ? speedState : "normal"}
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
                </div>
                <div className={cx("displacement-display")}>
                  <ProgressBar
                    completed={
                      lastOperationStatus?.displacement
                        ? displacementCompletedNumber
                        : 0
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
                    {!!lastOperationStatus?.is_hard_locked ? (
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
                    {!!lastOperationStatus?.is_endpoint ? (
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

  const renderBreakdownStatusItems = () => {
    return breakdownStatus.map((status, id) => {
      return (
        <tr key={id} className={cx("status-item")}>
          <th scope="row">{status.id}</th>
          <td>
            {status?.is_obstructed ? status?.is_obstructed.toString() : ""}
          </td>
          <td>{status?.is_skewed ? status?.is_skewed.toString() : ""}</td>
          <td>
            {status?.is_overload_motor
              ? status?.is_overload_motor.toString()
              : ""}
          </td>
          <td>{status?.created_at}</td>
        </tr>
      );
    });
  };

  const data = {
    datasets: [
      {
        data: totalFaultsArray,
        backgroundColor: ["green", "darkorange", "darkred"],
      },
    ],
    labels: ["Obstructed", "Skewed", "Overload Motor"],
  };

  const renderBreakdownStatus = () => {
    return (
      <div className={cx("operation-container")}>
        <div className={cx("row")}>
          <h2 className={cx("status--title", "col-sm-2")}>Breakdown Status</h2>
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
                <Button to="/" secondary normal>
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("display-record", "col-sm-7")}>
            <table className={cx("table", "table-dark", "table-hover")}>
              <thead>
                <tr>
                  <th scope="col">ID </th>
                  <th scope="col">Obstructed</th>
                  <th scope="col">Skewed</th>
                  <th scope="col">Overload Motor</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>{renderBreakdownStatusItems()}</tbody>
            </table>
          </div>
          <div className={cx("breakdown-status-chart", "col-sm-3")}>
            <h2 className={cx("breakdown-status--title")}>
              Breakdown Statistics
            </h2>
            <div className={cx("breakdown-doughnut-chart")}>
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <h2 className={cx("status--title", "col-sm-2")}>Rack Information</h2>
        <div className={cx("status--title", "col-sm-2", "offset-sm-7")}>
          <div className={cx("operation-actions")}>
            <div className={cx("start-operation-btn")}>
              <Button to="/" secondary normal>
                Edit
              </Button>
            </div>
            <div className={cx("start-operation-btn")}>
              <Button to="/" third normal>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("col-sm-10", "rack-information")}>
          <div className={cx("card", "text-bg-dark")}>
            <div className={cx("card-header", "rack-information-header")}>
              <strong>{rack?.rack_name}</strong>
            </div>
            <div className={cx("card-body")}>
              <h4 className={cx("card-title")}>
                <strong>Role: </strong>
                {rack?.role}
              </h4>
              <h4 className={cx("card-title")}>
                <strong>Rack Group: </strong>
                {rackGroup?.location} | {rackGroup?.description}
              </h4>
              <h4 className={cx("card-title")}>
                <strong>Created by: </strong>
                {user?.username}
              </h4>
              <h4 className={cx("card-title")}>
                <strong>Created at: </strong>
                {rack?.created_at}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("row")}>{renderEnvStatus()}</div>
      <div className={cx("row")}>{renderOperationStatus()}</div>
      <div className={cx("row")}>{renderBreakdownStatus()}</div>
    </div>
  );
}

export default RackStatus;
