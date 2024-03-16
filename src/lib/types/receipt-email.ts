export type TransactionItem = {
  stripeId: string;
  amount_total: number | null;
  description: string;
  quantity: number;
};

export type ReceiptProps = {
  customerName: string;
  customerEmail: string;
  customerAddress: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
  };
  transactionDetails: TransactionItem[];
  receiptNumber: string;
  amount: number;
  date: string;
};

export type User = {
  email: string;
  name: string;
};
