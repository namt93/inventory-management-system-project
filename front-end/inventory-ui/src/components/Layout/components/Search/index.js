import RackItem from "~/components/RackItem";
import UserItem from "~/components/UserItem";
import DocumentItem from "~/components/DocumentItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import * as rackServices from "~/apiServices/rackServices";
import { useDebounce } from "~/hooks";

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

  const debounced = useDebounce(searchValue, 500);

  const getSearch = async (query) => {
    const response = await Promise.all([
      rackServices.getSearchDocuments(query),
      rackServices.getSearchRacks(query),
    ]);

    setSearchResult(response);
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
                searchRacks?.map((rack) => {
                  return <RackItem key={rack.id} data={rack} />;
                })
              ) : (
                <h4 className={cx("search-empty")}>There is no rack</h4>
              )}
              <h4 className={cx("search-title")}>Documents</h4>
              {!!searchDocuments && searchDocuments.length > 0 ? (
                searchDocuments?.map((document) => {
                  return <DocumentItem key={document.id} data={document} />;
                })
              ) : (
                <h4 className={cx("search-empty")}>There is no document</h4>
              )}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideSearchResult}
      >
        <input
          className={cx("input-search")}
          type="search"
          placeholder="Search"
          aria-label="Search"
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
      </Tippy>
      <button className={cx("btn-search")} type="submit">
        Search
      </button>
    </>
  );
}

export default Search;
