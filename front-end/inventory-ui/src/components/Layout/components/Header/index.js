import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faComputer } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Header() {
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
              <input
                className={cx("input-search")}
                type="search"
                placeholder="Search"
                aria-label="Search"
                spellCheck={false}
              />
              <button className={cx("btn-search")} type="submit">
                Search
              </button>
            </div>
          </div>
          <div className={"col-sm-2"}>
            <div className={cx("header-notification")}></div>
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
