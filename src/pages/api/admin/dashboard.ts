import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Order, Product, User } from '@/models';

type Data = {
    numberOfOrders: number;
    paidOrders: number
    notPaidOrders: number
    numberOfClients: number
    numberOfProducts: number
    outOfStock: number
    lowInventory: number
} | { users: any }

export default async function handlerDashboard(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect()

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        outOfStock,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count()
    ])

    await db.disconnect()


    res.status(200).json({
        notPaidOrders: numberOfOrders - paidOrders,
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        outOfStock,
        lowInventory,
    })
}