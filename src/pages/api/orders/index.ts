import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { IOrder } from '@/interfaces'
import { db } from '@/database';
import { Order, Product } from '@/models';

type Data = 
| { message: string }
| IOrder

export default function handlerOrders(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){
        case 'POST':
            return createOrder( req, res )
        
        default:
            return res.status(400).json({ message: 'Method does not exist' })
    }

}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, totalPrice } = req.body as IOrder

    const session: any = await getServerSession(req, res, authOptions);
    if( !session ){
        return res.status(401).json({ message: 'Must be authenticated to do this' })
    }

    const productsIds = orderItems.map( product => product._id )
    await db.connect()

    const productsDB = await Product.find({ _id: { $in: productsIds } })
    
    try {

        const subtotal = orderItems.reduce((total, item) => {
            const currentPrice = productsDB.find( prod => prod.id === item._id )?.price
            if( !currentPrice ){
                throw new Error('Check the cart again, product does not exist')
            }


            return total + currentPrice * item.quantity
        }, 0)

        const taxes = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const backendTotal = subtotal + taxes

        if( totalPrice !== backendTotal ){
            throw new Error('The total price does not match with database')
        }

        const userId = session.user._id
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
        newOrder.totalPrice = Math.round( newOrder.totalPrice * 100 ) / 100

        await newOrder.save()
        await db.disconnect()

        return res.status(201).json( newOrder )

    } catch (error:any) {
        await db.disconnect()
        console.log(error)
        res.status(400).json({ message: error.message || 'Check server logs' })
    }

}