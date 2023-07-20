import classNames from "classnames/bind";
import styles from "./SearchRack.module.scss";
import RackItem from "~/components/RackItem";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import * as rackServices from "~/apiServices/rackServices";
import Tippy from "@tippyjs/react/headless";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function SearchRack(props, ref) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 400);

  const getRackSearchByName = async (rackName) => {
    const result = await Promise.all([rackServices.getSearchRacks(rackName)]);

    setSearchResult(result);
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    getRackSearchByName(debounced);
  }, [debounced]);

  const searchRacks = searchResult[0];

  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  const handleClickRack = (rackName) => {
    if (!!rackName) {
      handleHideSearchResult();
      inputRef.current.value = rackName;
    }
  };

  // Pass rack input value to DocumentAdd
  useImperativeHandle(ref, () => {
    return {
      getRackInput: () => {
        return inputRef.current?.value;
      },
    };
  });

  return (
    <Tippy
      interactive
      // visible
      placement="bottom-end"
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {!!searchRacks && searchRacks.length > 0 ? (
              searchRacks?.map((rack, index) => {
                return (
                  index < 6 && (
                    <RackItem
                      key={rack.id}
                      data={rack}
                      onClick={handleClickRack}
                    />
                  )
                );
              })
            ) : (
              <h4 className={cx("search-empty")}>No racks match your search</h4>
            )}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideSearchResult}
    >
      <input
        className={cx("rack-config-input")}
        type="search"
        ref={inputRef}
        aria-label="Search"
        spellCheck={false}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onFocus={() => setShowResult(true)}
      />
    </Tippy>
  );
}

export default forwardRef(SearchRack);
