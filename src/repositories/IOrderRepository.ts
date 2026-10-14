export interface OrderRepository {
    create(costumer: string, items: string, total: number): Promise<number>;
}