import classNames from "classnames/bind";
import styles from "./SearchUser.module.scss";
import UserItem from "~/components/UserItem";
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

function SearchUser(props, ref) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 400);

  const getUserSearchByName = async (username) => {
    const result = await Promise.all([rackServices.getSearchUsers(username)]);

    setSearchResult(result);
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    getUserSearchByName(debounced);
  }, [debounced]);

  const searchUsers = searchResult[0];

  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  const handleClickUser = (username) => {
    if (!!username) {
      handleHideSearchResult();
      inputRef.current.value = username;
    }
  };

  // Pass manage input value to DocumentAdd
  useImperativeHandle(ref, () => {
    return {
      getManagerInput: () => {
        return inputRef.current?.value;
      },
    };
  });

  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {!!searchUsers && searchUsers.length > 0 ? (
              searchUsers?.map((user, index) => {
                return (
                  index < 6 && (
                    <UserItem
                      key={user.id}
                      data={user}
                      onClick={handleClickUser}
                    />
                  )
                );
              })
            ) : (
              <div className={cx("search-empty")}>No users</div>
            )}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideSearchResult}
    >
      <input
        className={cx("user-config-input")}
        type="search"
        ref={inputRef}
        aria-label="Search"
        spellCheck={false}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setShowResult(true)}
      />
    </Tippy>
  );
}

export default forwardRef(SearchUser);
