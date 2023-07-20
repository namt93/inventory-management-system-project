import classNames from "classnames/bind";
import styles from "./SearchRackGroup.module.scss";
import RackGroupItem from "~/components/RackGroupItem";
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

function SearchRackGroup(props, ref) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 400);

  const getRackGroupSearchByName = async (rackGroupName) => {
    const result = await Promise.all([
      rackServices.getSearchRackGroups(rackGroupName),
    ]);

    setSearchResult(result);
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    getRackGroupSearchByName(debounced);
  }, [debounced]);

  const searchRackGroups = searchResult[0];

  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  const handleClickRackGroup = (rackGroupName) => {
    if (!!rackGroupName) {
      handleHideSearchResult();
      inputRef.current.value = rackGroupName;
    }
  };

  useImperativeHandle(ref, () => {
    return {
      // Pass rack group input value to RackAdd
      getRackGroupInput: () => {
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
            {!!searchRackGroups && searchRackGroups.length > 0 ? (
              searchRackGroups?.map((rackGroup, index) => {
                return (
                  index < 6 && (
                    <RackGroupItem
                      key={rackGroup.id}
                      data={rackGroup}
                      onClick={handleClickRackGroup}
                    />
                  )
                );
              })
            ) : (
              <h4 className={cx("search-empty")}>
                No rack groups match your search
              </h4>
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

export default forwardRef(SearchRackGroup);
