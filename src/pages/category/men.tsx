import { Typography } from "@mui/material"
import { useProducts } from "@/hooks"
import { FullScreenLoading, ProductList, ShopLayout } from "@/components"


const MenPage = () => {

    const { products, isError, isLoading } = useProducts('/products?gender=men')

    return (
        <ShopLayout title="TesloShop - Men" pageDescription="All products for men">
            <Typography variant="h1" component='h1' >Shop</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Men</Typography>
            {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
        </ShopLayout>
    )
}

export default MenPage