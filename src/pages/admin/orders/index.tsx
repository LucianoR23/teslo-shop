import { AdminLayout } from "@/components"
import { IOrder, IUser } from "@/interfaces";
import { currency } from "@/utils";
import { ConfirmationNumberRounded } from "@mui/icons-material"
import { Chip, Grid, makeStyles } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from "next/link";
import useSWR from "swr";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250, cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'email', headerName: 'Email', width: 250, cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'name', headerName: 'Full name', width: 250, cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'total', headerName: 'Total amount', width: 150, align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    {
        field: 'isPaid',
        headerName: 'Paid',
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
            ? ( <Chip variant="outlined" label='Paid' color="success" /> )
            : ( <Chip variant="outlined" label='Not paid' color="error" /> )
        },
        cellClassName: 'border-line',
        headerClassName: 'border-line'
    },
    { field: 'noProducts', headerName: 'Number of Products', width: 250, align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    {
        field: 'check',
        headerName: 'Check order',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <Link href={ `/admin/orders/${ row.id }` } target="_blank" prefetch={false}>Check order</Link>
            )
        },
        cellClassName: 'border-line',
        headerClassName: 'border-line'
    },
    { field: 'createdAt', headerName: 'Created at', width: 250, align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
]

const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders')

    if( !data && !error ) return (<></>)

    const rows = data!.map( order=> ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: currency.formatUSA(order.totalPrice),
        isPaid: order.isPaid,
        noProducts: order.totalQuantity,
        createdAt: new Date(order.createdAt!).toLocaleDateString() + ' ' + new Date(order.createdAt!).toLocaleTimeString(),
    }) )

    return (
        <AdminLayout title='Orders' subtitle='Order maintenance' icon={ <ConfirmationNumberRounded sx={{ mr: 1 }} /> }>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid className="border-line" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }} disableRowSelectionOnClick columns={ columns } rows={ rows } autoPageSize /* initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 20, 30]} */ />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default OrdersPage