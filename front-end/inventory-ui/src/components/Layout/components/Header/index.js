import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleQuestion,
  faCog,
  faComputer,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Menu from "~/components/Popper/Menu";
import WarningItem from "~/components/WarningItem";
import Search from "../Search";

const cx = classNames.bind(styles);

const WARNING_MENU = [
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
    is_obstructed: true,
    is_skewed: false,
    is_overload_motor: true,
    created_at: "2023-06-20T11:51:38.616072Z",
  },
];

function Header() {
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/@nblackk",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: "Help",
      separate: true,
      to: "/help",
    },
    {
      icon: <FontAwesomeIcon icon={faCog} />,
      title: "Settings",
      to: "/setting",
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Sign out",
      to: "/login",
      separate: true,
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={"row"}>
          {/* Logo */}
          <div className={"col-sm-3"}>
            <a className={cx("header-trademark")} href="/">
              <FontAwesomeIcon icon={faComputer} /> iPAC Lab
            </a>
          </div>
          {/* Search */}
          <div className="col-sm-6">
            <div className={cx("header-search")}>
              <Search />
            </div>
          </div>
          <div className={"col-sm-1 offset-sm-1"}>
            <Tippy
              interactive
              trigger="click"
              offset={[0, 4]}
              render={(attrs) => (
                <div
                  className={cx("notification-result")}
                  tabIndex="-1"
                  {...attrs}
                >
                  <PopperWrapper>
                    <h4 className={cx("notification-title")}>Notifications</h4>
                    {WARNING_MENU.map((warning) => {
                      return <WarningItem key={warning?.id} data={warning} />;
                    })}
                  </PopperWrapper>
                </div>
              )}
            >
              <button className={cx("header-notification")}>
                <FontAwesomeIcon
                  icon={faBell}
                  className={cx("header-notification-icon")}
                />
              </button>
            </Tippy>
          </div>
          {/* More */}
          <div className="col-sm-1">
            <Menu items={userMenu} offset={[0, 0]} trigger="click">
              <div className={cx("header-more")}>
                <div className={cx("header-more-title")}>namt93</div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={cx("fa-chevron-down")}
                />
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
