import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Wrapper as PopperWrapper } from "~/components/Popper";

// import { useState } from "react";
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
import RackItem from "~/components/RackItem";
import UserItem from "~/components/UserItem";
import DocumentItem from "~/components/DocumentItem";
import Menu from "~/components/Popper/Menu";

const cx = classNames.bind(styles);

function Header() {
  // const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSearchResult([1, 2, 3]);
  //   }, 0);
  // });
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
              <Tippy
                interactive
                // visible={searchResult.length > 0}
                render={(attrs) => (
                  <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      <h4 className={cx("search-title")}>Racks</h4>
                      <RackItem />
                      <RackItem />
                      <RackItem />
                      <h4 className={cx("search-title")}>Users</h4>
                      <UserItem />
                      <UserItem />
                      <UserItem />
                      <h4 className={cx("search-title")}>Documents</h4>
                      <DocumentItem />
                      <DocumentItem />
                      <DocumentItem />
                    </PopperWrapper>
                  </div>
                )}
              >
                <input
                  className={cx("input-search")}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  spellCheck={false}
                />
              </Tippy>
              <button className={cx("btn-search")} type="submit">
                Search
              </button>
            </div>
          </div>
          <div className={"col-sm-1 offset-sm-1"}>
            <button className={cx("header-notification")}>
              <FontAwesomeIcon
                icon={faBell}
                className={cx("header-notification-icon")}
              />
            </button>
          </div>
          {/* More */}
          <div className="col-sm-1">
            <Menu items={userMenu}>
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
