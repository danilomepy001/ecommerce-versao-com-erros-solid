import { Request, Response } from 'express';
import logger from '../lib/logger';
import { OrderService } from '../services/OrderService';

export class OrderController {
  constructor(private orderService: OrderService) { }

  async processOrder(req: Request, res: Response) {
    try {
      const { customer, items, paymentMethod, paymentDetails } = req.body;
      const result = await this.orderService.placeOrder(customer, items, paymentMethod, paymentDetails);

      return res.json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview,
      });

    } catch (error: any) {
      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}