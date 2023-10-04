import { useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { ItemCounter, ShopLayout, SizeSelector, Slideshow } from "@/components"
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { dbProducts } from '@/database';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';


interface Props {
    product: IProduct
}

const ProductPage = ({ product }: Props) => {

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        images: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    })

    const { addProductCart, cart } = useContext( CartContext )
    const router = useRouter()

    const onSelectedSize = ( size: ISize ) => {
        setTempCartProduct( currentProd => ({ ...currentProd, size }))
    }

    const addToCart = () => {


        addProductCart( tempCartProduct )
        router.push('/cart')
    }

    const onUpdateQuantity = ( newValue: number ) => {
        setTempCartProduct( currentProd => ({ ...currentProd, quantity: newValue }))
    }

    return (
        <ShopLayout title={ product.title } pageDescription={ product.description }>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <Slideshow images={ product.images } />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        <Typography variant="h1" component='h1'>{ product.title }</Typography>
                        <Typography variant="subtitle1" component='h2'>${ product.price }</Typography>

                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Quantity</Typography>
                            <ItemCounter  currentValue={ tempCartProduct.quantity } updatedQuantity={ onUpdateQuantity  } maxValue={ product.inStock } />
                            <SizeSelector onSelectedSize={ onSelectedSize } selectedSize={ tempCartProduct.size }  sizes={ product.sizes } />
                        </Box>

                        {
                            (product.inStock > 0)
                                ? (
                                    <Button onClick={ addToCart } color="secondary" disabled={ !tempCartProduct.size } className="circular-btn">
                                        {
                                            tempCartProduct.size
                                                ? 'Add to cart'
                                                : 'Select a size'
                                        }
                                    </Button>
                                )
                                : <Chip label="Out of stock" color="error" variant="outlined" />
                        }

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2">{ product.description }</Typography>
                        </Box>

                    </Box>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}


// export const getServerSideProps: GetServerSideProps = async({ params }) => {
//     const { slug } = params as { slug: string }

//     const product = await dbProducts.getProductSlug( slug )

//     if( !product ){
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }



export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllSlugs()

    return {
        paths: productSlugs.map( ({ slug }) => ({
            params: { slug }
        })),
        fallback: "blocking"
    }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string }

    const product = await dbProducts.getProductSlug( slug )

    if( !product ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}

export default ProductPage