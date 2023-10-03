import { ShopLayout, CartList, OrderSummary } from "@/components"
import CreditScoreRounded from "@mui/icons-material/CreditScoreRounded"
import CreditCardOffRounded from "@mui/icons-material/CreditCardOffRounded"
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material"
import NextLink from "next/link"


const OrderPage = () => {
    return (
        <ShopLayout title="Order summary 23" pageDescription={"Order Summary"}>

            <Typography variant="h1" component='h1'>Order: ABC123</Typography>

            {/* <Chip sx={{ my: 2 }} label="Pending payment" variant="outlined" color="error" icon={ <CreditCardOffRounded /> } /> */}
            <Chip sx={{ my: 2 }} label="Order has already been paid" variant="outlined" color="success" icon={ <CreditScoreRounded /> } />
            
            <Grid container>

                <Grid item xs={12} sm={7}>
                    <CartList editable={ false } />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary (3 items)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="subtitle1">Delivery address</Typography>
                                <Link underline="always" component={ NextLink } href='/checkout/address' passHref>
                                    Edit
                                </Link>
                            </Box>

                            <Typography>Luciano Rodriguez</Typography>
                            <Typography>25 de mayo 556</Typography>
                            <Typography>Corrientes, 3400</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>+54 9 3794123456</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='end' marginBottom={1}>
                                <Link underline="always" component={ NextLink } href='/cart' passHref>
                                    Edit
                                </Link>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                {/* todo */}
                                <h1>Pagar</h1>
                                <Chip sx={{ my: 2 }} label="Order has already been paid" variant="outlined" color="success" icon={ <CreditScoreRounded /> } />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default OrderPage