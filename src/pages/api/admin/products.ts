import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IProduct[]

export default function handlerProductsAdmin(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method) {
        case 'GET':
            return getProductsSearch( req, res )
            
        case 'PUT':
            return updateProducts( req, res )

        case 'POST':
            return createProduct( req, res )
        default:
            return res.status(400).json({ message: 'Method does not exist' })
            
    }

}



const getProductsSearch = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    await db.connect()
    const products = await Product.find().sort({ title: 'asc' }).lean()
    await db.disconnect()

    // TODO 

    return res.status(200).json( products )
}

const updateProducts = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {



}

const createProduct = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {



}
