import { initialData } from "@/database/products"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { ItemCounter } from ".."


const cartProducts = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CartList = ({ editable = false }: Props) => {



    return (
        <>
            {
                cartProducts.map( product => (
                    <Grid container spacing={2} key={ product.slug } sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            {/* TODO llevar a la pagfina del producto */}
                            <Link component={ NextLink } href='/product/slug' passHref>
                                <CardActionArea>
                                    <CardMedia image={ `/products/${ product.images[0] }` } component='img' sx={{ borderRadius: '5px' }} />
                                </CardActionArea>
                            </Link>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{ product.title }</Typography>
                                <Typography variant="body1">Size: <strong>L</strong></Typography>
                                {
                                    editable ? <ItemCounter /> : <Typography variant="subtitle1">3</Typography>
                                }
                                {/* <ItemCounter /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1">${ product.price }</Typography>
                            {
                                editable && (
                                    <Button variant="text" color="secondary">
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