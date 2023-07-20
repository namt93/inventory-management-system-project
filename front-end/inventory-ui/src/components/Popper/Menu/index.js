import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

const defaultFunc = () => {};

function Menu({
  children,
  className,
  small = false,
  normal = false,
  large = false,
  items = [],
  offset = [0, 0],
  trigger = "mouseenter",
  onChange = defaultFunc,
}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const classes = cx("menu-list", {
    [className]: className,
    small,
    normal,
    large,
  });

  if (current.data != items) {
    setHistory([{ data: items }]);
  }

  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item?.title);
            }
          }}
        ></MenuItem>
      );
    });
  };

  return (
    <Tippy
      interactive
      // visible
      offset={offset}
      trigger={trigger}
      // delay={[0, 200]}
      render={(attrs) => (
        <div className={classes} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {renderItem()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
