import { PaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class DebitCardPayment implements PaymentMethod {
    process(amount: number, details: any): void {
        logger.info('Processando débito...');
    }
}