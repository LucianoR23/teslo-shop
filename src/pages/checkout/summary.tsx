import { useContext, useEffect } from 'react';
import NextLink from "next/link"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartContext } from "@/context";
import { CartList, OrderSummary, ShopLayout } from "@/components"
import { useRouter } from 'next/router';
import { countries } from '@/utils';
import Cookies from 'js-cookie';


const SummaryPage = () => {

    const { shippingAddress, totalQuantity } = useContext( CartContext )
    const router = useRouter()


    useEffect(() => {
        if( !Cookies.get('address') ){
            router.push('/checkout/address')
        }
    }, [router])

    
    

    if( !shippingAddress ){
        return (<></>)
    }

    const { address, city, country: code, firstName, lastName, phone, zip, address2 } = shippingAddress
    const country = countries.find( ctry => ctry.code === code )

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
                            <Typography variant="h2">Summary ({totalQuantity} { totalQuantity === 1 ? 'item' : 'items' })</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="subtitle1">Delivery address</Typography>
                                <Link underline="always" component={ NextLink } href='/checkout/address' passHref>
                                    Edit
                                </Link>
                            </Box>

                            <Typography>{ `${firstName} ${lastName}` }</Typography>
                            <Typography>{ `${ address }${ address2 ? ',' : '' } ${ address2 }` }</Typography>
                            <Typography>{ `${ city } - ${ zip }` }</Typography>
                            <Typography>{ `${ country?.name }` }</Typography>
                            <Typography>{ `${ phone }` }</Typography>

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