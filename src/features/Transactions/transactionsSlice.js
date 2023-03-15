import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTransactions, deleteTransactions, editTransactions, getTransactions } from './transactionsApi';

const initialState = {
   transactions: [],
   isLoading: false,
   isError: false,
   error: '',
   editing: {},
};

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
   const transactions = await getTransactions();
   return transactions;
});

export const createTransactions = createAsyncThunk('transactions/createTransactions', async (data) => {
   const transaction = await addTransactions(data);
   return transaction;
});

export const changeTransaction = createAsyncThunk('transactions/changeTransaction', async ({ data, id }) => {
   const transaction = await editTransactions(data, id);
   return transaction;
});

export const removeTransaction = createAsyncThunk('transactions/removeTransaction', async (id) => {
   const transaction = await deleteTransactions(id);
   return transaction;
});

//create Slice
const transactionsSlice = createSlice({
   name: 'transaction',
   initialState,
   reducers: {
      editingActive: (state, action) => {
         state.editing = action.payload;
      },
      editingInActive: (state) => {
         state.editing = {};
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchTransactions.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
         })
         .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = action.payload;
         })
         .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.transactions = [];
         })
         .addCase(createTransactions.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
         })
         .addCase(createTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.push(action.payload);
         })
         .addCase(createTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
         })
         .addCase(changeTransaction.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
         })
         .addCase(changeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            const indexToUpdate = state.transactions.findIndex((t) => t.id === action.payload.id);
            state.transactions[indexToUpdate] = action.payload;
         })
         .addCase(changeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.transactions = [];
         })
         .addCase(removeTransaction.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
         })
         .addCase(removeTransaction.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.isError = false;
            state.transactions = state.transactions.filter((t) => t.id !== action.meta.arg);
         })
         .addCase(removeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
         });
   },
});

export default transactionsSlice.reducer;
export const { editingActive, editingInActive } = transactionsSlice.actions;
