import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  faSmog,
  faTemperature2,
  faWater,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./RackStatus.module.scss";
import * as rackServices from "~/apiServices/rackServices";
import SegmentedProgressBar from "~/components/Bar/SegmentedProgressBar";

const cx = classNames.bind(styles);

function RackStatus() {
  const [envStatus, setEnvStatus] = useState([]);

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

  // Get lastest record of station
  const getEnvStatus = async () => {
    const result = await rackServices.getRackEnvStatus(rackID);
    console.log(result);
    setEnvStatus(result.data);
  };

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
    console.log(envStatus.slice(-1));
    const lastStatus = envStatus[envStatus.length - 1];

    const temperatureState = calculateStateProperty(
      lastStatus?.temperature,
      tempStopNumbers,
      tempStates
    );

    const humidityState = calculateStateProperty(
      lastStatus?.humidity,
      humidityStopNumbers,
      propertyStates
    );

    const smokeState = calculateStateProperty(
      lastStatus?.smoke,
      smokeStopNumbers,
      propertyStates
    );

    const weightState = calculateStateProperty(
      lastStatus?.weight,
      weightStopNumbers,
      propertyStates
    );

    return (
      <div className={cx("display-record", "col-sm-10")}>
        <h2 className={cx("today-details--title")}>Environment Status</h2>
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
                  {lastStatus?.temperature ? lastStatus.temperature : 0}&deg;C
                </h2>
                <div className={cx("property-state")}>
                  {temperatureState ? temperatureState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={
                    lastStatus?.temperature ? lastStatus.temperature : 0
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
                <h2>{lastStatus?.humidity ? lastStatus.humidity : 0}%</h2>
                <div className={cx("property-state")}>
                  {humidityState ? humidityState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={lastStatus?.humidity ? lastStatus.humidity : 0}
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
                <h2>{lastStatus?.smoke ? lastStatus.smoke : 0}</h2>
                <div className={cx("property-state")}>
                  {smokeState ? smokeState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={lastStatus?.smoke ? lastStatus.smoke : 0}
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
                <h2>{lastStatus?.weight ? lastStatus.weight : 0}kg</h2>
                <div className={cx("property-state")}>
                  {weightState ? weightState : "normal"}
                </div>
              </div>
              <div className={cx("property-display")}>
                <SegmentedProgressBar
                  completed={lastStatus?.weight ? lastStatus.weight : 0}
                  stopNumbers={weightStopNumbers}
                  colors={[
                    "rgb(0,150,1)",
                    "rgb(210,210,0)",
                    "rgb(200, 100, 20)",
                  ]}
                  states={propertyStates}
                />
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
      <div>{renderEnvStatus()}</div>
    </div>
  );
}

export default RackStatus;
