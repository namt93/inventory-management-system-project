import classNames from "classnames/bind";
import styles from "./User.module.scss";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

const USER_ITEMS = [
  {
    id: 1,
    username: "admin",
    first_name: "",
    last_name: "",
    date_joined: "2023-05-26T05:58:16Z",
  },
  {
    id: 2,
    username: "namtran",
    first_name: "",
    last_name: "",
    date_joined: "2023-05-28T09:02:12.387978Z",
  },
  {
    id: 3,
    username: "namtran1",
    first_name: "nam",
    last_name: "tran",
    date_joined: "2023-05-28T09:03:33.135225Z",
  },
  {
    id: 4,
    username: "admin2",
    first_name: "",
    last_name: "",
    date_joined: "2023-05-28T10:17:45.718275Z",
  },
  {
    id: 5,
    username: "admin3",
    first_name: "",
    last_name: "",
    date_joined: "2023-05-28T10:30:27.148790Z",
  },
];

function User() {
  const renderUserItems = () => {
    return USER_ITEMS.map((user, id) => {
      var hrefLinkItem = "/users/user/" + `${user.id}`;
      return (
        <tr key={id} className={cx("user-item")}>
          <th scope="row">
            <a href={hrefLinkItem}>{user.id}</a>
          </th>
          <td>
            <a href={hrefLinkItem}>{user.username}</a>
          </td>
          <td>
            <a href={hrefLinkItem}>{user.first_name}</a>
          </td>
          <td>
            <a href={hrefLinkItem}>{user.last_name}</a>
          </td>
          <td>
            <a href={hrefLinkItem}>{user.date_joined}</a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-sm-1")}>
          <h2 className={cx("page-title")}>Users</h2>
        </div>
        <div className={cx("col-sm-1", "offset-sm-9")}>
          <div className={cx("add-user-btn")}>
            <Button to="/users/user/add" primary normal>
              Add user
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("user-table", "col-sm-11")}>
          <table className={cx("table", "table-dark", "table-hover")}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Date joined</th>
              </tr>
            </thead>
            <tbody>{renderUserItems()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
