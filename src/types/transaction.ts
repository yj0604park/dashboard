export interface CreateAccountDialogProps {
    open: boolean;
    onModalClose: () => void;
    bankName: string;
    bankId: string;
    accountName: string;
    accountId: string;
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
    bankId: string;
    accountName: string;
    accountId: string;
    accountCurrency: string;
    refresh: (event: any) => void;
}
