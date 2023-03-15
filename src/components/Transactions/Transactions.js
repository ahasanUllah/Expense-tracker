import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/Transactions/transactionsSlice';
import Transaction from './Transaction';

const Transactions = () => {
   const { transactions, isLoading, isError, error } = useSelector((state) => state.transactions);
   let content;

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchTransactions());
   }, [dispatch]);

   if (isLoading) content = <p>Loading...</p>;
   if (!isLoading && isError) content = <p className="error">{error}</p>;
   if (!isLoading && !isError && transactions.length === 0) content = <p>No transaction found</p>;
   if (!isLoading && !isError && transactions.length > 0)
      content = transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />);

   return (
      <>
         <p className="second_heading">Your Transactions:</p>

         <div className="conatiner_of_list_of_transactions">
            <ul>{content}</ul>
         </div>
      </>
   );
};

export default Transactions;
