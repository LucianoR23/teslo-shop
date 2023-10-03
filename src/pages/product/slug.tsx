import { ItemCounter, ShopLayout, SizeSelector, Slideshow } from "@/components"
import { initialData } from "@/database/products"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"


const product = initialData.products[0]

const ProductPage = () => {
    return (
        <ShopLayout title={ product.title } pageDescription={ product.description }>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <Slideshow images={ product.images } />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        {/* title */}
                        <Typography variant="h1" component='h1'>{ product.title }</Typography>
                        <Typography variant="subtitle1" component='h2'>${ product.price }</Typography>

                        {/* cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Quantity</Typography>
                            <ItemCounter />
                            <SizeSelector /* selectedSize={ product.sizes[3] } */ sizes={ product.sizes } />
                        </Box>

                        {/* agregar al carrito */}
                        <Button color="secondary" className="circular-btn">
                            Add to cart
                        </Button>

                        {/* <Chip label="No products available" color="error" variant="outlined" /> */}

                        {/* description */}
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

export default ProductPage