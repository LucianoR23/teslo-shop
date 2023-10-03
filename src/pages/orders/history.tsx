import NextLink from 'next/link';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "@/components"


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full name', width: 300 },
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
            return ( <Link component={ NextLink } href={ `/orders/${ params.row.id }` } passHref underline='hover'>Check order {params.row.id}</Link>)
        }
    },
]

const rows = [
    { id: 1, paid: true, fullname: 'Luciano Rodriguez' },
    { id: 2, paid: false, fullname: 'Lemy' },
    { id: 3, paid: true, fullname: 'Fernando Herrera' },
]

const HistoryPage = () => {
    return (
        <ShopLayout title={"Order history"} pageDescription={"Customer order history"}>
            <Typography variant="h1" component='h1' marginBottom={2}>Order history</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid disableRowSelectionOnClick columns={ columns } rows={ rows } /* pageSizeOptions={[10, 20, 30]} */ initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 20, 30]} />
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default HistoryPage