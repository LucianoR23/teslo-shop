import { useContext, useState } from 'react';
import NextLink from "next/link"
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import { CartContext } from "@/context";
import { CartList, OrderSummary, ShopLayout } from "@/components"
import { countries } from '@/utils';


const SummaryPage = () => {

    const { shippingAddress, totalQuantity, createOrder } = useContext( CartContext )
    const router = useRouter()

    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    if( !shippingAddress ){
        return (<></>)
    }

    const { address, city, country: code, firstName, lastName, phone, zip, address2 } = shippingAddress
    const country = countries.find( ctry => ctry.code === code )

    const onCreateOrder = async() => {
        setIsPosting(true)

        const { hasError, message } = await createOrder()

        if( hasError ){
            setIsPosting(false)
            setErrorMessage( message )
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
            return
        }

        router.replace(`/orders/${ message }`)
    }

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
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button disabled={ isPosting } onClick={ onCreateOrder } color="secondary" className="circular-btn" fullWidth>
                                    Place order
                                </Button>
                                <Chip color='error' className='fadeIn' icon={ <ErrorRounded /> } label={ errorMessage } sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage