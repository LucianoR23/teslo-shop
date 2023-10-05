import { useContext } from "react"
import NextLink from "next/link"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { ItemCounter } from ".."
import { CartContext } from "@/context"
import { ICartProduct } from "@/interfaces"


interface Props {
    editable?: boolean
}

export const CartList = ({ editable = false }: Props) => {

    const { cart, updateProductCart, removeCartProduct } = useContext(CartContext)

    const onNewQuantity = ( product: ICartProduct, newQuantityValue: number ) => {
        product.quantity = newQuantityValue
        updateProductCart( product )
    }

    const deleteCartProduct = ( product: ICartProduct ):void => {
        removeCartProduct( product )
    }

    return (
        <>
            {
                cart.map( product => (
                    <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            {/* TODO llevar a la pagfina del producto */}
                            <Link component={ NextLink } href={`/product/${product.slug}`} passHref>
                                <CardActionArea>
                                    <CardMedia image={ `/products/${ product.images }` } component='img' sx={{ borderRadius: '5px' }} />
                                </CardActionArea>
                            </Link>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{ product.title }</Typography>
                                <Typography variant="body1">Size: <strong>{product.size}</strong></Typography>
                                {
                                    editable 
                                        ? <ItemCounter currentValue={product.quantity} maxValue={10} updatedQuantity={(newQuantityValue) => onNewQuantity(product, newQuantityValue)} /> 
                                        : <Typography variant="subtitle1">{ product.quantity } { product.quantity > 1 ? 'items' : 'item' }</Typography>
                                }
                                {/* <ItemCounter /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1">${ product.price /* * product.quantity */}</Typography>
                            {
                                editable && (
                                    <Button onClick={ () => deleteCartProduct( product ) } variant="text" color="secondary">
                                        Remove
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
