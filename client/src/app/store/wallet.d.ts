export interface WalletState {
    walletBalance: number;
    isLoading: boolean;
    totalCount: number;
    transactions: Transactions[];
    tableOptions: TableOptions;
}

export interface TableOptions{
    limit: number;
    offset?: number;
    sort?: string;
    sortOrder?: string;
}

export interface Transactions {
    id: string;
    walletId: string;
    date: string;
    amount: string;
    balance: string;
    description: string;
    type: "CREDIT" | "DEBIT"
}