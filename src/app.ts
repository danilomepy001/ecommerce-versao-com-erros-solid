import express from 'express';
import { OrderController } from './controllers/OrderController';
import { OrderService } from './services/OrderService';
import { PrismaProductRepository } from './repositories/PrismaProductRepository';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { NotificationService } from './services/NotificationService';
import { EtherealMailProvider } from './providers/EtherealMailProvider';


const app = express();
app.use(express.json());

const service = new OrderService(
    new PrismaProductRepository(),
    new PrismaOrderRepository(),
    new NotificationService(new EtherealMailProvider())
);

const orderController = new OrderController(service);

app.post('/orders', (req, res) => orderController.processOrder(req, res));

export default app;