import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "@/components"
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full name', width: 200 },
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Shows information if the order is paid or not',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                ? <Chip color='success' label='Paid' variant='outlined' />
                : <Chip color='error' label='Not paid' variant='outlined' />
            )
        }
    },
    {
        field: 'order', headerName: 'Check order', width: 200, sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return ( <Link component={ NextLink } href={ `/orders/${ params.row.orderid }` } passHref underline='hover'>Check order {params.row.id}</Link>)
        }
    },
    { field: 'created', headerName: 'Created at', width: 200 },
    { field: 'orderid', headerName: 'Order ID', width: 200 },
    { field: 'paidat', headerName: 'Paid at', width: 200, renderCell: (params: GridRenderCellParams) => {
        return (
            params.row.paidat
            ? params.row.paidat
            : (<Chip color='error' label='Not paid' variant='outlined' />)
        )
    } },
]

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, index) => ({
        id: (index + 1),
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        created: new Date(order.createdAt!).toLocaleDateString() + ' ' + new Date(order.createdAt!).toLocaleTimeString(),
        orderid: order._id,
        paidat: order.paidAt ? new Date(order.paidAt).toLocaleDateString() + ' ' + new Date(order.paidAt).toLocaleTimeString() : null
    }))

    return (
        <ShopLayout title={"Order history"} pageDescription={"Customer order history"}>
            <Typography variant="h1" component='h1' marginBottom={2}>Order history</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid disableRowSelectionOnClick columns={ columns } rows={ rows } autoPageSize /* initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 20, 30]} */ />
                </Grid>
            </Grid>

        </ShopLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const session: any = await getServerSession(req, res, authOptions);

    const orders = await dbOrders.getOrdersByUser( session.user._id )


    return {
        props: {
            orders
        }
    }
}

export default HistoryPage