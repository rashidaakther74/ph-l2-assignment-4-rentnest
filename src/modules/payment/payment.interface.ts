export interface ICreatePayment {
    rentalRequestId: string;
    method: string;
}

export interface IConfirmPayment {
    transactionId: string;
}