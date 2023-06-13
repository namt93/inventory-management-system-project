import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import {
  faCalendar,
  faCog,
  faTh,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Sidebar({ sidebarColor = "var(--background-black-color)" }) {
  var sidbarStyle = {
    backgroundColor: `${sidebarColor}`,
  };
  return (
    <aside className={cx("wrapper")}>
      <nav className={cx("sidebar")} style={sidbarStyle}>
        {/* <h3 className={cx('sidebar__heading')}>
                    <i className={cx('sidebar__heading-icon')}>
                        <FontAwesomeIcon icon={faCloudSun} />
                    </i>
                    <div className={cx('name-app')}> Wanru</div>
                </h3> */}
        <ul className={cx("sidebar-menu")}>
          <li
            className={cx("sidebar-item", {
              "sidebar-item--active": window.location.pathname == "/",
            })}
          >
            <Link to="/" className={cx("sidebar-item__link")}>
              <div className={cx("sidebar-content")}>
                <i className={cx("sidebar-item-icon")}>
                  <FontAwesomeIcon icon={faTh} />
                </i>
                <span className={cx("sidebar-item-title")}>Rack</span>
              </div>
            </Link>
          </li>
          <li
            className={cx("sidebar-item", {
              "sidebar-item--active": window.location.pathname == "/users",
            })}
          >
            <Link to="/users" className={cx("sidebar-item__link")}>
              <div className={cx("sidebar-content")}>
                <i className={cx("sidebar-item-icon")}>
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <span className={cx("sidebar-item-title")}>User</span>
              </div>
            </Link>
          </li>
          <li
            className={cx("sidebar-item", {
              "sidebar-item--active": window.location.pathname == "/calendar",
            })}
          >
            <Link to="/calendar" className={cx("sidebar-item__link")}>
              <div className={cx("sidebar-content")}>
                <i className={cx("sidebar-item-icon")}>
                  <FontAwesomeIcon icon={faCalendar} />
                </i>
                <span className={cx("sidebar-item-title")}>Calendar</span>
              </div>
            </Link>
          </li>
          <li
            className={cx("sidebar-item", {
              "sidebar-item--active": window.location.pathname == "/setting",
            })}
          >
            <Link to="/setting" className={cx("sidebar-item__link")}>
              <div className={cx("sidebar-content")}>
                <i className={cx("sidebar-item-icon")}>
                  <FontAwesomeIcon icon={faCog} />
                </i>
                <span className={cx("sidebar-item-title")}>Setting</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
