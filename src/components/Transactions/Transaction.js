import React from 'react';
import { useDispatch } from 'react-redux';
import deleteImage from '../../assets/images/delete.svg';
import editImage from '../../assets/images/edit.svg';
import { editingActive, removeTransaction } from '../../features/Transactions/transactionsSlice';
import { numberWithCommas } from '../../utils/thousendSeperator';

const Transaction = ({ transaction }) => {
   const { name, type, amount, id } = transaction;
   const dispatch = useDispatch();
   const handleEdit = () => {
      dispatch(editingActive(transaction));
   };

   const handleDelete = () => {
      dispatch(removeTransaction(id));
   };
   return (
      <li className={`transaction ${type === 'income' ? 'income' : 'expense'}`}>
         <p>{name}</p>
         <div className="right">
            <p>৳ {numberWithCommas(amount)}</p>
            <button className="link" onClick={handleEdit}>
               <img className="icon" src={editImage} alt="edit" />
            </button>
            <button className="link" onClick={handleDelete}>
               <img className="icon" src={deleteImage} alt="delete" />
            </button>
         </div>
      </li>
   );
};

export default Transaction;
