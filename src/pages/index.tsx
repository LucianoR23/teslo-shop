import { ProductList, ShopLayout } from "@/components";
import { initialData } from "@/database/products";
import { Typography } from "@mui/material";


export default function Home() {
  return (
    <ShopLayout title="TesloShop - Home" pageDescription="Find the best products of Teslo here">
      <Typography variant="h1" component='h1' >Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >All products</Typography>

      <ProductList products={ initialData.products as any } />

    </ShopLayout>
  )
}
