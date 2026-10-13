import { PaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class PixPayment implements PaymentMethod {
    process(amount: number, details: any): void {
        logger.info(`Boleto de R$ ${amount} gerado`);
    }
}