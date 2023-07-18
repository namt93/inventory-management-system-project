import classNames from "classnames/bind";
import styles from "./Document.module.scss";
import Button from "~/components/Button";
import * as rackServices from "~/apiServices/rackServices";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const DOCUMENT_ITEMS = [
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

const BORROWED_DOCUMENT_ITEMS = [
  {
    id: 1,
    borrower: 1,
    document: [1],
    date_borrowed: "2023-07-13T15:39:36.677996Z",
    date_returned: "2023-07-13T15:39:36.677996Z",
    active: true,
  },
];

function Document() {
  const [documentResponse, setDocumentResponse] = useState([]);
  const [documentID, setDocumentID] = useState();
  const params = useParams();
  const location = useLocation();

  if (documentID !== params.id) {
    setDocumentID(params.id);
  }
  const documentQuery = location.state?.query;

  const getDocuments = async (documentID) => {
    if (!documentID) {
      const response = await Promise.all([
        rackServices.getDocuments(),
        rackServices.getBorrowings(),
        rackServices.getRacks(),
      ]);
      setDocumentResponse(response);
    }
    if (!!documentID && documentID !== "search") {
      const response = await Promise.all([
        rackServices.getDocumentByID(documentID),
        rackServices.getBorrowings(),
        rackServices.getRacks(),
      ]);
      setDocumentResponse(response);
    } else if (!!documentQuery) {
      const response = await Promise.all([
        rackServices.getSearchDocuments(documentQuery),
        rackServices.getBorrowings(),
        rackServices.getRacks(),
      ]);
      setDocumentResponse(response);
    }
  };
  // console.log(documentResponse);

  // Whenever the deps change
  useEffect(() => {
    getDocuments(documentID);
  }, [documentID, documentQuery]);

  const checkBorrowedDocument = (number) => {
    return documentResponse[1]?.some((borrowing, id) => {
      return borrowing?.document.includes(number);
    });
  };
  const documentValue = documentResponse[0];

  const renderDocumentItems = () => {
    return documentValue?.map((document, id) => {
      var hrefLinkItem = "/racks/rack/" + `${document.rack_id}`;
      return (
        <tr key={id} className={cx("document-item")}>
          <th scope="row">{document.id}</th>
          <td>{document.author}</td>
          <td style={{ width: "40%" }}>{document.title}</td>
          <td>{document.published_at}</td>
          <td style={{ width: "9%" }}>
            {checkBorrowedDocument(document.id) ? (
              <Button href={hrefLinkItem} secondaryunable small disabled>
                Borrowing
              </Button>
            ) : (
              <Button href={hrefLinkItem} primary small>
                Available
              </Button>
            )}
          </td>
        </tr>
      );
    });
  };

  const renderDocumentItem = () => {
    var hrefLinkItem = "/racks/rack/" + `${documentValue?.rack_id}`;
    return (
      <tr key={documentValue?.id} className={cx("document-item")}>
        <th scope="row">{documentValue?.id}</th>
        <td>{documentValue?.author}</td>
        <td style={{ width: "40%" }}>{documentValue?.title}</td>
        <td>{documentValue?.published_at}</td>
        <td style={{ width: "9%" }}>
          {checkBorrowedDocument(documentValue?.id) ? (
            <Button href={hrefLinkItem} secondaryunable small disabled>
              Borrowing
            </Button>
          ) : (
            <Button href={hrefLinkItem} primary small>
              Available
            </Button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-sm-1")}>
          <h2 className={cx("page-title")}>Documents</h2>
        </div>
        <div className={cx("col-sm-2", "offset-sm-9")}>
          <div className={cx("add-document-btn")}>
            <Button to="/documents/document/add" primary large>
              Add document
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
                <th scope="col">Author</th>
                <th scope="col">Title</th>
                <th scope="col">Published at</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {!!documentID && documentID !== "search"
                ? renderDocumentItem()
                : renderDocumentItems()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Document;
