import classNames from "classnames/bind";
import styles from "./Rack.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

const RACK_ITEMS = [
  {
    id: 1,
    rack_name: "A100",
    role: "master",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-26T06:06:09.982876Z",
  },
  {
    id: 2,
    rack_name: "A101",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-26T06:06:27.559949Z",
  },
  {
    id: 3,
    rack_name: "A102",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-26T06:06:48.903991Z",
  },
  {
    id: 4,
    rack_name: "B100",
    role: "master",
    rack_group: 2,
    user: 1,
    created_at: "2023-05-27T09:05:04.577638Z",
  },
  {
    id: 5,
    rack_name: "B101",
    role: "slave",
    rack_group: 2,
    user: 1,
    created_at: "2023-05-29T00:57:31.360892Z",
  },
  {
    id: 6,
    rack_name: "B102",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-29T01:40:46.078149Z",
  },
  {
    id: 7,
    rack_name: "B103",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-29T01:55:46.700180Z",
  },
  {
    id: 8,
    rack_name: "B104",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-29T02:20:52.652348Z",
  },
  {
    id: 9,
    rack_name: "B105",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-05-29T03:06:14.609363Z",
  },
];

function Rack() {
  const renderRackItems = () => {
    return RACK_ITEMS.map((rack, id) => {
      var hrefLinkItem = "racks/rack/" + `${rack.id}`;
      var hrefLinkGroup = "rack-groups/group/" + `${rack.rack_group}`;
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
            <Button to="/racks/rack/add" primary normal>
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
            <tbody>{renderRackItems()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rack;
