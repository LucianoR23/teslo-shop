import { GetServerSideProps, NextPage } from 'next'
import { CreditScoreRounded, CreditCardOffRounded, ConfirmationNumberRounded } from '@mui/icons-material'
import { Typography, Chip, Grid, Card, CardContent, Divider, Box } from '@mui/material'
import { dbOrders } from '@/database'
import { AdminLayout, CartList, OrderSummary, ShopLayout } from '@/components'
import { IOrder } from '@/interfaces'
import { countries } from '@/utils'



interface Props {
    order: IOrder
}

const OrdersIdAdmin: NextPage<Props> = ({ order }) => {

    const { address, city, country: code, firstName, lastName, phone, zip, address2 } = order.shippingAddress
    const country = countries.find( ctry => ctry.code === code )
    const { subtotalPrice, taxes, totalPrice, totalQuantity } = order
    const values = { subtotalPrice, taxes, totalPrice, totalQuantity }

    return (
        <AdminLayout title="Order summary" subtitle={`Order ID: ${ order._id }`} icon={ <ConfirmationNumberRounded /> }>

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
                            {
                                order.isPaid
                                    ? ( <Chip sx={{ my: 2 }} label="Paid" variant="outlined" color="success" icon={ <CreditScoreRounded /> } /> )
                                    : ( <Chip sx={{ my: 2 }} label="Not paid" variant="outlined" color="error" icon={ <CreditCardOffRounded /> } /> )
                            }
                                
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {

    const { id = '' } = query

    const order = await dbOrders.getOrderById( id.toLocaleString() )

    if( !order ){
        return {
            redirect: {
                destination: '/admin/orders',
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

export default OrdersIdAdmin
