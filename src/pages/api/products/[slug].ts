import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | { message: string } | IProduct

export default function handlerSlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { slug } = req.query

    // if( !mongoose.isValidObjectId( id ) ){
    //     return res.status(400).json({ message: 'The ID is not valid ' + id })
    // }
    
    switch ( req.method ) {
        case 'GET':
            return getProductSlug( req, res )

            
        default:
            return res.status(400).json({ message: 'Method does not exist'})
    }

}

const getProductSlug = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    await db.connect()
    const { slug } = req.query
    const productToGet = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if( !productToGet ){
        return res.status(400).json({ message: 'There is no product with the slug' + slug })
    }

    productToGet.images = productToGet.images.map( image => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${ image }`
    } )
    
    res.status(200).json( productToGet )

}
