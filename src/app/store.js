import { configureStore } from '@reduxjs/toolkit';
import transactionsSlice from '../features/Transactions/transactionsSlice';

export const store = configureStore({
   reducer: {
      transactions: transactionsSlice,
   },
});
