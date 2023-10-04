import { Product } from "@/models"
import { db } from "."
import { IProduct } from "@/interfaces"


export const getProductSlug = async( slug: string ): Promise<IProduct | null> => {
    
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if( !product ){
        return null
    }

    return JSON.parse( JSON.stringify( product ) )

}

interface ProductSlug {
    slug: string
}
export const getAllSlugs = async(): Promise<ProductSlug[]> => {
    
    await db.connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()

    return slugs;
}

export const getProductsSearch = async ( term: string): Promise<IProduct[]> => {
    
    term = term.toString().toLowerCase()

    await db.connect()
    // const products = await Product.find({
    //     $text: { $search: term }
    // }).select('title images price inStock slug -_id').lean()

    const products = await Product.find({
        $or: [
            { title: { $regex: new RegExp(term, 'i') } },
            { tags: { $regex: new RegExp(term, 'i') } }
        ]
    }).select('title images price inStock slug -_id').lean()
    
    await db.disconnect()

    return products
}

export const getAllProducts = async(): Promise<IProduct[]> => {

    await db.connect()
    const allProducts = await Product.find().select('title images price inStock slug -_id').lean()
    await db.disconnect()

    return allProducts
}