import RackItem from "~/components/RackItem";
import UserItem from "~/components/UserItem";
import DocumentItem from "~/components/DocumentItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import * as rackServices from "~/apiServices/rackServices";
import { useDebounce } from "~/hooks";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const DOCUMENTS_SEARCH_RESULTS = [
  {
    id: 1,
    rack_id: 1,
    manager: 1,
    author: "Ngo Tat To",
    title: "Huong dan su dung smart inventory software",
    published_at: "2023-07-02T00:00:00Z",
    created_at: "2023-07-12T14:42:29.402386Z",
  },
  {
    id: 2,
    rack_id: 1,
    manager: 1,
    author: "Ngo Tat To",
    title: "Lam chu django trong 24h",
    published_at: "2023-07-03T06:00:00Z",
    created_at: "2023-07-12T14:48:43.251687Z",
  },
  {
    id: 3,
    rack_id: 1,
    manager: 1,
    author: "Ngo Tat To, Quach Tieu Cuong",
    title: "He thong truyen thong 1",
    published_at: "2023-07-06T12:00:00Z",
    created_at: "2023-07-12T14:49:51.424734Z",
  },
  {
    id: 4,
    rack_id: 1,
    manager: 1,
    author: "Ngo Tat To, Quach Tieu Cuong",
    title: "Huong dan lam chu giai tich, dai so, tin hoc dai cuong trong 24h",
    published_at: "2023-07-08T14:14:36Z",
    created_at: "2023-07-13T14:14:38.185494Z",
  },
];

const RACKS_SEARCH_RESULTS = [
  {
    id: 1,
    rack_name: "A100",
    role: "master",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-12T14:41:32.270409Z",
  },
  {
    id: 2,
    rack_name: "A101",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-12T14:41:32.271411Z",
  },
  {
    id: 3,
    rack_name: "A102",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-12T14:41:32.272410Z",
  },
];

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const searchBtnRef = useRef();
  const inputRef = useRef();
  const history = useNavigate();

  const debounced = useDebounce(searchValue, 320);

  const getSearch = async (query) => {
    if (!!query) {
      const response = await Promise.all([
        rackServices.getSearchDocuments(query),
        rackServices.getSearchRacks(query),
      ]);

      setSearchResult(response);
    }
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    getSearch(debounced);
  }, [debounced]);

  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  const handleEnterSearch = () => {
    searchBtnRef.current.focus();
    handleSubmiSearch();
  };

  const handleSubmiSearch = () => {
    history(`/documents/search`, {
      state: {
        query: inputRef.current?.value,
      },
    });
    setShowResult(false);
  };

  const searchDocuments = searchResult[0];
  const searchRacks = searchResult[1];

  return (
    <>
      <Tippy
        interactive
        // visible
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Racks</h4>
              {!!searchRacks && searchRacks.length > 0 ? (
                searchRacks?.map((rack, index) => {
                  return (
                    index < 6 && (
                      <RackItem
                        key={rack.id}
                        data={rack}
                        onClick={handleHideSearchResult}
                      />
                    )
                  );
                })
              ) : (
                <h4 className={cx("search-empty")}>
                  No racks match your search
                </h4>
              )}
              <h4 className={cx("search-title")}>Documents</h4>
              {!!searchDocuments && searchDocuments.length > 0 ? (
                searchDocuments?.map((document, index) => {
                  return (
                    index < 4 && (
                      <DocumentItem
                        key={document.id}
                        data={document}
                        onClick={handleHideSearchResult}
                      />
                    )
                  );
                })
              ) : (
                <h4 className={cx("search-empty")}>
                  No documents match your search
                </h4>
              )}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideSearchResult}
      >
        <input
          ref={inputRef}
          className={cx("input-search")}
          type="search"
          placeholder="Search"
          aria-label="Search"
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleEnterSearch();
            }
          }}
        />
      </Tippy>
      <button
        className={cx("btn-search")}
        type="submit"
        ref={searchBtnRef}
        onClick={handleSubmiSearch}
      >
        Search
      </button>
    </>
  );
}

export default Search;
