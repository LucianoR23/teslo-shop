import { Typography } from "@mui/material"
import { useProducts } from "@/hooks"
import { FullScreenLoading, ProductList, ShopLayout } from "@/components"


const KidsPage = () => {

    const { products, isError, isLoading } = useProducts('/products?gender=kid')

    return (
        <ShopLayout title="TesloShop - Kids" pageDescription="All products for kids">
            <Typography variant="h1" component='h1' >Shop</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Kids</Typography>
            <ProductList products={ products } />
            {
                isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } />
            }
        </ShopLayout>
    )
}

export default KidsPage