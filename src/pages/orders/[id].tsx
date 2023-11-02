import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import CreditScoreRounded from "@mui/icons-material/CreditScoreRounded"
import CreditCardOffRounded from "@mui/icons-material/CreditCardOffRounded"
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip, CircularProgress } from "@mui/material"
import { ShopLayout, CartList, OrderSummary } from "@/components"
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'
import { countries } from '@/utils'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { tesloApi } from '@/apis'


export type OrderResponseBody = {
    id: string;
    status:
        | "CREATED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "COMPLETED"
        | "PAYER_ACTION_REQUIRED";
}

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter()
    const [isPaying, setIsPaying] = useState(false)

    const { address, city, country: code, firstName, lastName, phone, zip, address2 } = order.shippingAddress
    const country = countries.find( ctry => ctry.code === code )
    const { subtotalPrice, taxes, totalPrice, totalQuantity } = order
    const values = { subtotalPrice, taxes, totalPrice, totalQuantity }

    const onOrderCompleted = async( details: OrderResponseBody ) => {
        if( details.status !== "COMPLETED" ){
            return alert('There is no payment on PayPal')
        }

        setIsPaying(true)

        try {

            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionid: details.id,
                orderid: order._id
            })

            router.reload()

        } catch (error) {
            setIsPaying(false)
            console.log(error)
            alert('Error')
        }

    }
    

    return (
        <ShopLayout title="Order summary" pageDescription={"Order Summary"}>

            <Typography variant="h1" component='h1'>Order: { order._id }</Typography>

            {
                order.isPaid
                    ? (
                        <Chip sx={{ my: 3 }} label="Order has already been paid" variant="outlined" color="success" icon={ <CreditScoreRounded /> } />
                    )
                    : (
                        <Chip sx={{ my: 3 }} label="Pending payment" variant="outlined" color="error" icon={ <CreditCardOffRounded /> } />
                    )
            }

            
            <Grid container className='fadeIn'>

                <Grid item xs={12} sm={7}>
                    <CartList products={ order.orderItems } />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary ({order.totalQuantity} { order.totalQuantity === 1 ? 'item' : 'items' })</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="subtitle1">Delivery address</Typography>
                            </Box>

                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ `${ address }${ address2 ? ',' : '' } ${ address2 }` }</Typography>
                            <Typography>{ `${ city } - ${ zip }` }</Typography>
                            <Typography>{ `${ country?.name }` }</Typography>
                            <Typography>{ `${ phone }` }</Typography>

                            <Divider sx={{ my: 1.5 }} />
                            <OrderSummary values={ values } />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {/* todo */}
                                <Box display={ isPaying ? 'flex' : 'none' } justifyContent='center' component='div' className='fadeIn'>
                                    <CircularProgress />
                                </Box>

                                <Box display={ isPaying ? 'none' : 'flex' } flexDirection='column'>
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip sx={{ my: 2 }} label="Order has already been paid" variant="outlined" color="success" icon={ <CreditScoreRounded /> } />
                                            )
                                            : (
                                                <>
                                                    <PayPalButtons
                                                        createOrder={(data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [
                                                                    {
                                                                        amount: {
                                                                            value: `${order.totalPrice}`,
                                                                        },
                                                                    },
                                                                ],
                                                            })
                                                        }}
                                                        onApprove={(data, actions) => {
                                                            return actions.order!.capture().then((details) => {
                                                                onOrderCompleted(details)
                                                            })
                                                        }}
                                                    />
                                                </>
                                            )
                                    }

                                </Box>
                                
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {

    const { id = '' } = query
    const session: any = await getServerSession(req, res, authOptions);

    const order = await dbOrders.getOrderById( id.toLocaleString() )

    if( !order ){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }


    if( order.user !== session.user._id ){
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage