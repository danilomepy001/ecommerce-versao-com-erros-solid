import { ProductRepository } from '../repositories/IProductRepository';
import { OrderRepository } from '../repositories/IOrderRepository';
import { NotificationService } from './NotificationService';
import { ProductFactory } from '../domain/ProductFactory';
import { PaymentFactory } from '../payments/PaymentFactory';

export class OrderService {
    constructor(
        private productRepository: ProductRepository,
        private orderRepository: OrderRepository,
        private notificationService: NotificationService
    ) { }

    async placeOrder(customer: string, items: any[], paymentMethod: string, paymentDetails: any): Promise<any> {
        if (!items || items.length === 0) {
            throw new Error('Carrinho vazio');
        }

        let total = 0;
        const productsDetails: any[] = [];

        for (const item of items) {
            const data = await this.productRepository.findById(item.productId);
            if (!data) {
                throw new Error(`Produto ${item.productId} não encontrado`);
            }

            const product = ProductFactory.createProduct(data);
            total += product.price * item.quantity + product.calculateFreight()

            productsDetails.push({ ...data, quantity: item.quantity });
        }
        const payment = PaymentFactory.createPayment(paymentMethod);
        payment.process(total, paymentDetails);

        const orderId = await this.orderRepository.create(customer, JSON.stringify(productsDetails), total);

        const emailPreview = await this.notificationService.sendOrderConfirmation(customer, orderId, total, productsDetails);

        return { orderId, emailPreview };
    }
}