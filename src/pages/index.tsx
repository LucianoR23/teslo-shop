import { Typography } from "@mui/material";
import { useProducts } from "@/hooks";
import { FullScreenLoading, ProductList, ShopLayout } from "@/components";


export default function Home() {

  const { products, isError, isLoading } = useProducts('/products')

  return (
    <ShopLayout title="TesloShop - Home" pageDescription="Find the best products of Teslo here">
      <Typography variant="h1" component='h1' >Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >All products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }

    </ShopLayout>
  )
}