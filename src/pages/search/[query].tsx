import { GetServerSideProps } from 'next'
import { Typography } from "@mui/material";
import { ProductList, ShopLayout } from "@/components";
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props {
    products: IProduct[]
    query: string
    foundProducts: boolean
}

export default function SearchPage({ products, query, foundProducts }: Props) {


    return (
        <ShopLayout title="TesloShop - Search" pageDescription="Find the best products of Teslo here">
        <Typography variant="h1" component='h1' >Search</Typography>
        {
            foundProducts
                ? <Typography variant="h2" sx={{ mb: 1 }} textTransform='capitalize'>{query}</Typography>
                : <Typography variant="h2" sx={{ mb: 1 }} >No products found with the name: {`"${query}"`}</Typography>
        }
        
        <ProductList products={ products } />


        </ShopLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string }

    if( query.length === 0 ){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsSearch( query )
    const foundProducts = products.length > 0
    //TODO retornar otros productos
    if( !foundProducts ){
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            query,
            foundProducts
        }
    }
}