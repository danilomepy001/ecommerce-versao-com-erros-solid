import { PrismaClient } from '@prisma/client';
import { OrderRepository } from './IOrderRepository';

const prisma = new PrismaClient();

export class PrismaOrderRepository implements OrderRepository {
    async create(customer: string, items: string, total: number): Promise<number> {
        const order = await prisma.order.create({
            data: {
                customer,
                items: items,
                total: total,
                status: 'confirmed'
            }
        });
        return order.id;
    }
}