import NextLink from "next/link"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary, ShopLayout } from "@/components"


const SummaryPage = () => {
    return (
        <ShopLayout title="Order summary" pageDescription={"Order Summary"}>

            <Typography variant="h1" component='h1'>Order summary</Typography>
            
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
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Place order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage