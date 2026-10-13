import { PaymentMethod } from './IPaymentMethod';
import { CreditCardPayment } from './CreditCardPayment';
import { DebitCardPayment } from './DebitCardPayment';
import { PixPayment } from './PixPayment';

export class PaymentFactory {
  static createPayment(method: string): PaymentMethod {
    if (method === 'credit_card') {
      return new CreditCardPayment();
    } else if (method === 'debit_card') {
      return new DebitCardPayment();
    } else if (method === 'pix') {
        return new PixPayment();
    }
    throw new Error('Método de pagamento não suportado');
  }
}