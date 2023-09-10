import { RootState, useDispatch, useSelector } from "app/store";
import TransactionsTable from "./TransactionsTable";
import { useEffect } from "react";
import { getTransactions } from "app/store/actions";

const Transactions: React.FC = () => {
  const isLoading = useSelector(
    (state: RootState) => state.wallet.isLoading
  );
  const limit = useSelector((state: RootState) => state.wallet.tableOptions.limit);
  const offset = useSelector((state: RootState) => state.wallet.tableOptions.offset) || 0;
  const sort = useSelector((state: RootState) => state.wallet.tableOptions.sort);
  const sortOrder = useSelector((state: RootState) => state.wallet.tableOptions.sortOrder);
  const reduxDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTransactions({
        offset,
        limit,
        sortOrder,
        sort,
    }));
  }, [offset, limit, sortOrder, sort]);

  return (
    <>
      <TransactionsTable />
    </>
  );
};

export default Transactions;
