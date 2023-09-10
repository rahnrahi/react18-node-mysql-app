import * as React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ReactPaginate from "react-paginate";

import { RootState, useDispatch, useSelector } from "app/store";
import { setLimit, setSort } from "app/store/walletStore";

const TransactionsTable: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.wallet.transactions
  );
  const reduxDispatcher = useDispatch();
  const totalSize = useSelector((state: RootState) => state.wallet.totalCount);
  const sizePerPage = useSelector(
    (state: RootState) => state.wallet.tableOptions.limit
  );
  const offset =
    useSelector((state: RootState) => state.wallet.tableOptions.offset) || 0;
  const page = offset === 0 ? 0 : offset / sizePerPage;
  const pageCount = Math.ceil(totalSize / sizePerPage);

  const handlePageClick = ({ selected }) => {
    const page = Number(selected);
    const offset = page === 0 ? 0 : sizePerPage * page;
    reduxDispatcher(
      setLimit({
        offset: offset,
        limit: sizePerPage,
      })
    );
  };

  const handleSort = (field, order) => {
    reduxDispatcher(
      setSort({
        sort: field,
        sortOrder: order,
      })
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "Transaction ID",
    },
    {
      dataField: "date",
      text: "Transaction Date",
      sort: true,
      onSort: handleSort,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      onSort: handleSort,
    },
    {
      dataField: "balance",
      text: "Balance",
      sort: true,
      onSort: handleSort,
    },
  ];

  return (
    <>
      <BootstrapTable keyField="id" data={transactions} columns={columns} />
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page}
      />
    </>
  );
};
export default TransactionsTable;
