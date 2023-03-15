import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransactions, editingInActive } from '../features/Transactions/transactionsSlice';

const Form = () => {
   const { editing } = useSelector((state) => state.transactions);
   const { isLoading, isError, error } = useSelector((state) => state.transactions);
   const [name, setName] = useState('');
   const [type, setType] = useState('');
   const [amount, setAmount] = useState('');
   const [editMode, setEditMode] = useState(false);
   const dispatch = useDispatch();

   const handleCancelEdit = () => {
      setEditMode(false);
      reset();
      dispatch(editingInActive());
   };

   useEffect(() => {
      const { id, name, type, amount } = editing;
      setEditMode(true);
      if (id) {
         setName(name);
         setType(type);
         setAmount(amount);
      } else {
         reset();
         setEditMode(false);
      }
   }, [editing]);

   const reset = () => {
      setName('');
      setType('');
      setAmount('');
   };

   const handleCreate = (e) => {
      e.preventDefault();
      dispatch(
         createTransactions({
            name,
            type,
            amount: Number(amount),
         })
      );
      reset();
      e.target.reset();
   };

   const handleUpdate = (e) => {
      e.preventDefault();
      dispatch(
         changeTransaction({
            data: {
               name,
               type,
               amount,
            },
            id: editing?.id,
         })
      );
      reset();
      setEditMode(false);
   };
   return (
      <div className="form">
         <h3>Add new transaction</h3>
         <form onSubmit={editMode ? handleUpdate : handleCreate}>
            <div className="form-group">
               <label htmlFor="name">Name</label>
               <input
                  type="text"
                  name="name"
                  placeholder="My Salary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </div>

            <div className="form-group radio">
               <label htmlFor="type">Type</label>
               <div className="radio_group">
                  <input
                     type="radio"
                     value="income"
                     name="type"
                     checked={type === 'income'}
                     onChange={() => setType('income')}
                     required
                  />
                  <label htmlFor="type">Income</label>
               </div>
               <div className="radio_group">
                  <input
                     type="radio"
                     value="expense"
                     name="type"
                     placeholder="Expense"
                     checked={type === 'expense'}
                     onChange={() => setType('expense')}
                  />
                  <label htmlFor="type">Expense</label>
               </div>
            </div>

            <div className="form-group">
               <label htmlFor="amount">Amount</label>
               <input
                  type="number"
                  placeholder="300"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
               />
            </div>

            <button disabled={isLoading} className="btn" type="submit">
               {editMode ? 'Update Transaction' : 'Add Transaction'}
            </button>
            {!isLoading && isError && <p className="error">{error}</p>}
         </form>
         {editMode && (
            <button className="btn cancel_edit" onClick={handleCancelEdit}>
               Cancel Edit
            </button>
         )}
      </div>
   );
};

export default Form;
