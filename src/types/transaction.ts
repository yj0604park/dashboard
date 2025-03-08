export interface CreateAccountDialogProps {
    open: boolean;
    onModalClose: () => void;
    bankName: string;
    bankId: number;
    accountName: string;
    accountId: number;
    refresh: (event: any) => void;
}

export interface CreateRetailerInfo {
    name: string;
    type: string;
    category: string;
}


export interface CreateMultipleStockTransactionDialogProps {
    open: boolean;
    onModalClose: () => void;
    bankName: string;
    bankId: number;
    accountName: string;
    accountId: number;
    accountCurrency: string;
    refresh: (event: any) => void;
  }
  