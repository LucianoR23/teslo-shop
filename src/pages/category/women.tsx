import { Typography } from "@mui/material"
import { useProducts } from "@/hooks"
import { FullScreenLoading, ProductList, ShopLayout } from "@/components"


const WomenPage = () => {

    const { products, isError, isLoading } = useProducts('/products?gender=women')

    return (
        <ShopLayout title="TesloShop - Women" pageDescription="All products for women">
            <Typography variant="h1" component='h1' >Shop</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Women</Typography>
            {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
        </ShopLayout>
    )
}

export default WomenPage