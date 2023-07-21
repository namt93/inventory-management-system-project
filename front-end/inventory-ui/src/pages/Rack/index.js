import classNames from "classnames/bind";
import styles from "./Rack.module.scss";
import Button from "~/components/Button";
import Pagination from "~/components/Pagination";
import * as rackServices from "~/apiServices/rackServices";

import { useState } from "react";

const cx = classNames.bind(styles);

const RACK_ITEMS = [
  {
    id: 1,
    rack_name: "A100",
    role: "master",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:02.207662Z",
  },
  {
    id: 2,
    rack_name: "A101",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:02.209595Z",
  },
  {
    id: 3,
    rack_name: "A102",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:02.211592Z",
  },
  {
    id: 4,
    rack_name: "A103",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:26.365870Z",
  },
  {
    id: 5,
    rack_name: "A104",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:36.981658Z",
  },
  {
    id: 6,
    rack_name: "A105",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:56:47.240141Z",
  },
  {
    id: 7,
    rack_name: "B100",
    role: "master",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T14:59:21.165550Z",
  },
  {
    id: 8,
    rack_name: "B101",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T14:59:21.166551Z",
  },
  {
    id: 9,
    rack_name: "B102",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T14:59:21.166551Z",
  },
  {
    id: 10,
    rack_name: "B103",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T14:59:50.478770Z",
  },
  {
    id: 11,
    rack_name: "B104",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T15:00:07.217191Z",
  },
  {
    id: 12,
    rack_name: "B105",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-07-18T15:00:23.788134Z",
  },
  {
    id: 13,
    rack_name: "C100",
    role: "master",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:01:00.256097Z",
  },
  {
    id: 14,
    rack_name: "C101",
    role: "slave",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:01:00.257097Z",
  },
  {
    id: 15,
    rack_name: "C102",
    role: "slave",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:01:00.257097Z",
  },
  {
    id: 16,
    rack_name: "C103",
    role: "slave",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:01:27.167641Z",
  },
  {
    id: 17,
    rack_name: "C104",
    role: "slave",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:01:44.811078Z",
  },
  {
    id: 18,
    rack_name: "C105",
    role: "slave",
    rack_group: 3,
    user: 1,
    created_at: "2023-07-18T15:02:01.236250Z",
  },
  {
    id: 19,
    rack_name: "D100",
    role: "master",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-19T12:10:26.295611Z",
  },
  {
    id: 20,
    rack_name: "D101",
    role: "slave",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-19T12:10:26.297611Z",
  },
  {
    id: 21,
    rack_name: "D102",
    role: "slave",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-19T12:10:26.298613Z",
  },
  {
    id: 22,
    rack_name: "D103",
    role: "slave",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-19T12:11:06.184367Z",
  },
  {
    id: 23,
    rack_name: "D104",
    role: "slave",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-20T15:34:19.206517Z",
  },
  {
    id: 24,
    rack_name: "D105",
    role: "slave",
    rack_group: 4,
    user: 1,
    created_at: "2023-07-20T15:34:43.198341Z",
  },
  {
    id: 25,
    rack_name: "E100",
    role: "master",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T16:19:48.208996Z",
  },
  {
    id: 26,
    rack_name: "E101",
    role: "slave",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T16:19:48.211010Z",
  },
  {
    id: 27,
    rack_name: "E102",
    role: "slave",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T16:19:48.211998Z",
  },
  {
    id: 28,
    rack_name: "E103",
    role: "slave",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T16:20:11.696478Z",
  },
  {
    id: 30,
    rack_name: "E104",
    role: "slave",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T17:03:40.271158Z",
  },
  {
    id: 31,
    rack_name: "E105",
    role: "slave",
    rack_group: 5,
    user: 1,
    created_at: "2023-07-20T17:06:39.550191Z",
  },
];

function Rack() {
  const [page, setPage] = useState(2);
  const [rackResponse, setRackResponse] = useState([]);
  const limit = 6;

  let totalPage = Math.ceil(RACK_ITEMS.length / limit);

  const handlePageChange = (value) => {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  };

  const getRacks = async () => {
    const response = await rackServices.getRacks();
    setRackResponse(response);
  };

  getRacks();

  const getRenderRacks = (page, limit) => {
    let array = [];
    for (let i = (page - 1) * limit; i < page * limit; i++) {
      if (i < rackResponse.length) {
        array.push(rackResponse[i]);
      }
    }

    return array;
  };

  const renderRackItems = (records) => {
    return records.map((rack, id) => {
      var hrefLinkItem = `racks/rack/${rack.id}`;
      var hrefLinkGroup = `rack-groups/group/${rack.rack_group}`;
      return (
        <tr key={id} className={cx("rack-item")}>
          <th scope="row">
            <a href={hrefLinkItem}>{rack.id}</a>
          </th>
          <td>
            <a href={hrefLinkItem}>{rack.rack_name}</a>
          </td>
          <td>
            <a href={hrefLinkGroup}>{rack.rack_group}</a>
          </td>
          <td>
            <a href={hrefLinkItem}>{rack.created_at}</a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-sm-1")}>
          <h2 className={cx("page-title")}>Racks</h2>
        </div>
        <div className={cx("col-sm-1", "offset-sm-9")}>
          <div className={cx("add-rack-btn")}>
            <Button to="/add-rack" primary normal>
              Add rack
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("rack-table", "col-sm-11")}>
          <table className={cx("table", "table-dark", "table-hover")}>
            <thead>
              <tr>
                <th scope="col">Rack ID</th>
                <th scope="col">Rack name</th>
                <th scope="col">Rack group</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>{renderRackItems(getRenderRacks(page, limit))}</tbody>
            {/* <nav>
              <ul className={cx("pagination")}>
                <li className={cx("page-item")}>
                  <a
                    href="/"
                    className={cx("page-link")}
                    onClick={handlePrePage}
                  >
                    Prev
                  </a>
                </li>
                {numbers.map((number, i) => {
                  <li
                    className={`page-item ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    <a
                      href="/"
                      className={cx("page-link")}
                      onClick={changeCurrentPage(number)}
                    >
                      {number}
                    </a>
                  </li>;
                })}
                <li className={cx("page-item")}>
                  <a
                    href="/"
                    className={cx("page-link")}
                    onClick={handleNextPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav> */}
          </table>
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col-sm-2", "offset-sm-8")} data-bs-theme="dark">
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            siblings={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Rack;
