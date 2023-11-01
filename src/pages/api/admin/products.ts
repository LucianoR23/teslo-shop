import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'

cloudinary.config( process.env.CLOUDINARY_URL || '' )

type Data = 
| { message: string }
| IProduct[]
| IProduct

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
    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            console.log(image)
            return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${ image }`
        } )

        return product
    } )

    return res.status(200).json( updatedProducts )
}

const updateProducts = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { _id = '', images = [] } = req.body as IProduct
    if( !isValidObjectId( _id ) ){
        return res.status(400).json({ message: 'The product ID is not valid' })
    }

    if( images.length < 2 ){
        return res.status(400).json({ message: 'At least two images are required' })
    }

    //TODO posiblemente tendremos un localhost:3000/products/asda.jpg

    try {
        
        await db.connect()

        const product = await Product.findById( _id )
        if( !product ){
            return res.status(400).json({ message: 'Could not find a product with that ID' })
        }

        product.images.forEach( async(image) => {
            if( !images.includes(image) ){
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( `teslo_shop/${ fileId }` )
                
            }
        } )

        await product.updateOne( req.body )
        await db.disconnect()

        return res.status(200).json( product )
        
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: 'Check console server' })
    }


}

const createProduct = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { images = [] } = req.body as IProduct

    if( images.length < 2 ){
        return res.status(400).json({ message: 'At least two images are required' })
    }
    
    //TODO posiblemente tendremos un localhost:3000/products/asda.jpg
    
    try {
        
        await db.connect()
        const productInDB = await Product.findOne({ slug: req.body.slug })
        if( productInDB ){
            await db.disconnect()
            return res.status(400).json({ message: 'There is already a product with that slug' })
        }

        const product = new Product( req.body )
        await product.save()
        await db.disconnect()

        res.status(201).json( product )
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: 'Check server logs' })
    }

}
