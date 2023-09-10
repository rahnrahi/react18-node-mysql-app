import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "utils/request";
import { TableOptions, Transactions } from "./wallet";

export const getWalletDetails = createAsyncThunk(
  "wallet/getWalletDetails",
  async (walletId: string, api) => {
    try {
      let response = await request("wallet/" + walletId);
      return processWallet(response);
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "wallet/getTransactions",
  async (props: TableOptions, api) => {
    const walletId = localStorage.getItem("walletId");
    try {
      let response: any = await request(
        `transactions?walletId=${walletId}&limit=${props.limit}&offset=${props.offset}&sort=${props.sort}&order=${props.sortOrder}`
      );
      return processTransactions(response);
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "wallet/addTransaction",
  async (payload: object, api) => {
    const walletId = localStorage.getItem("walletId");
    try {
      let response: any = await request(
        `transact/${walletId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      return {
        balance: response?.balance || 0,
      };
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

const processTransactions = (
  response: any
): {
  totalCount: number;
  list: Transactions[];
} => {
  return {
    totalCount: response.totalCount,
    list: response.list,
  };
};

const processWallet = (response: any) => {
  return {
    balance: response?.balance || 0,
    date: response?.date,
    name: response?.name,
  };
};
