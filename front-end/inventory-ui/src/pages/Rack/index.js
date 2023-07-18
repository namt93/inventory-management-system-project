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
  {
    id: 4,
    rack_name: "A103",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:34:29.748143Z",
  },
  {
    id: 5,
    rack_name: "A104",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:34:42.237991Z",
  },
  {
    id: 6,
    rack_name: "A105",
    role: "slave",
    rack_group: 1,
    user: 1,
    created_at: "2023-07-18T14:35:02.582084Z",
  },
];

function Rack() {
  const renderRackItems = () => {
    return RACK_ITEMS.map((rack, id) => {
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
