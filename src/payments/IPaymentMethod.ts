export interface PaymentMethod {
    process(amount: number, details: any): void;
}