import classNames from "classnames/bind";
import styles from "./DocumentAdd.module.scss";
import SearchRack from "~/components/Layout/components/Search/SearchRack";
import Button from "~/components/Button";
import SearchUser from "~/components/Layout/components/Search/SearchUser";
import * as rackServices from "~/apiServices/rackServices";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function DocumentAdd() {
  const [documentConfig, setDocumentConfig] = useState({
    rack: null,
    manager: null,
    author: "",
    title: "",
    published_at: "",
  });

  const navigator = useNavigate();
  const rackInputRef = useRef();
  const managerInputRef = useRef();
  const authorInputRef = useRef();

  //   when author config is typing
  useEffect(() => {
    getRackManagerInformation();
  }, [authorInputRef.current?.value]);

  const getRackManagerInformation = async () => {
    if (
      typeof rackInputRef.current?.getRackInput() === "string" &&
      typeof managerInputRef.current?.getManagerInput() === "string"
    ) {
      const response = await Promise.all([
        rackServices.getSearchRacks(rackInputRef.current?.getRackInput()),
        rackServices.getSearchUsers(managerInputRef.current?.getManagerInput()),
      ]);

      if (response.length > 1) {
        setDocumentConfig({
          ...documentConfig,
          rack: response[0][0]?.id,
          manager: response[1][0]?.id,
        });
      }
    }
  };

  const handleSubmit = async () => {
    rackServices.postDocuments(documentConfig);
    alert("Data Posted Successfully");
    navigator("/documents");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-title")}>Add Document</div>

      {/* Rack config */}
      <div className={cx("row", "rack-config")}>
        <div className={cx("col-sm-1", "config-title")}>Rack:</div>
        <div className={cx("col-sm-2", "offset-sm-1", "config-value")}>
          <div>
            <SearchRack ref={rackInputRef}></SearchRack>
          </div>
        </div>
      </div>

      {/* Manager config */}
      <div className={cx("row", "manager-config")}>
        <div className={cx("col-sm-1", "config-title")}>Manager:</div>
        <div className={cx("col-sm-1", "offset-sm-1", "config-value")}>
          <SearchUser ref={managerInputRef}></SearchUser>
        </div>
      </div>

      {/* Author config */}
      <div className={cx("row", "author-config")}>
        <div className={cx("col-sm-1", "config-title")}>Author:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            ref={authorInputRef}
            onChange={(e) =>
              setDocumentConfig({ ...documentConfig, author: e.target.value })
            }
          ></input>
        </div>
      </div>

      {/* Title config */}
      <div className={cx("row", "title-config")}>
        <div className={cx("col-sm-1", "config-title")}>Title:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            onChange={(e) =>
              setDocumentConfig({ ...documentConfig, title: e.target.value })
            }
          ></input>
        </div>
      </div>

      <div className={cx("row", "published-at-config")}>
        <div className={cx("col-sm-1", "config-title")}>Published at:</div>
        <div className={cx("col-sm-4", "offset-sm-1", "config-value")}>
          <input
            placeholder="Datetime yyyy-MM-ddThh:mm:ssZ"
            onChange={(e) =>
              setDocumentConfig({
                ...documentConfig,
                published_at: e.target.value,
              })
            }
          ></input>
        </div>
      </div>

      <div className={cx("row", "save-btn")}>
        <div className={cx("col-sm-1", "offset-sm-11")}>
          <Button forthblue normal onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DocumentAdd;
