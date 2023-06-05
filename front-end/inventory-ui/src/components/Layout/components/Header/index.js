import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Wrapper as PopperWrapper } from "~/components/Popper";

import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faComputer } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import RackItem from "~/components/RackItem";

const cx = classNames.bind(styles);
function Header() {
  const [searchResult, setSearchResult] = useState([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSearchResult([1, 2, 3]);
  //   }, 0);
  // });

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
                visible={searchResult.length > 0}
                render={(attrs) => (
                  <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      <h4 className={cx("search-title")}>Racks</h4>
                      <RackItem />
                      <RackItem />
                      <RackItem />
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
          {/* Header more */}
          <div className="col-sm-1">
            <div className={cx("header-more")}>
              <div className={cx("header-more-title")}>namt93</div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cx("fa-chevron-down")}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
