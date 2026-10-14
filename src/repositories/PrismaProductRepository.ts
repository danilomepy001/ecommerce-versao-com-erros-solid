import { PrismaClient } from '@prisma/client'
import { ProductRepository } from './IProductRepository';

const prisma = new PrismaClient; 

export class PrismaProductRepository implements ProductRepository {
    async findById(id: number): Promise<any>{
        return await prisma.product.findUnique({ where: { id: id } });
    }
}