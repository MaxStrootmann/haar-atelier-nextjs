export type TransactionItem = {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
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
