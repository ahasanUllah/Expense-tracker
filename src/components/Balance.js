import React from 'react';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../utils/thousendSeperator';

const Balance = () => {
   const { transactions } = useSelector((state) => state.transactions);

   const calculateBalance = (transaction) => {
      let balance = 0;
      transaction.forEach((t) => {
         const { type, amount } = t;
         if (type === 'income') {
            balance += amount;
         } else {
            balance -= amount;
         }
      });
      return balance;
   };

   return (
      <div className="top_card">
         <p>Your Current Balance</p>
         <h3>
            <span>৳</span>{' '}
            {transactions.length > 0 ? <span>{numberWithCommas(calculateBalance(transactions))}</span> : 0}
         </h3>
      </div>
   );
};

export default Balance;
