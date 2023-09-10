import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WalletState } from './wallet'
import { addTransaction, getTransactions, getWalletDetails } from './actions'

const initialState: WalletState = {
    walletBalance: 0,
    isLoading: false,
    totalCount: 0,
    transactions: [],
    tableOptions:{
        limit: 10,
        offset: 0,
        sort:'createdAt',
        sortOrder: 'DESC',
    }
}

export const walletSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.walletBalance = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    },
    setLimit: (state, action: PayloadAction<any>) => {
        state.tableOptions.limit = action.payload.limit
        state.tableOptions.offset = action.payload.offset
    },
    setSort: (state, action: PayloadAction<any>) => {
        state.tableOptions.sort = action.payload.sort
        state.tableOptions.sortOrder = action.payload.sortOrder
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletDetails.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(getWalletDetails.fulfilled, (state, action) => {
        state['isLoading'] = false
        state['walletBalance'] = action.payload?.balance;
      })
      .addCase(getWalletDetails.rejected, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(addTransaction.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state['isLoading'] = false
        state['walletBalance'] = action.payload?.balance;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(getTransactions.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state['isLoading'] = false
        state['transactions'] = action?.payload?.list || [];
        state['totalCount'] = action?.payload?.totalCount || 0;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state['isLoading'] = false
      })
    }
})

// Action creators are generated for each case reducer function
export const { setBalance, setLimit, setSort, setIsLoading} = walletSlice.actions

export default walletSlice.reducer