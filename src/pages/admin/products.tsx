import { AdminLayout } from "@/components"
import { IProduct, IUser } from "@/interfaces";
import { currency } from "@/utils";
import { CategoryRounded, ConfirmationNumberRounded } from "@mui/icons-material"
import { CardMedia, Chip, Grid } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from "next/link";
import useSWR from "swr";


const columns: GridColDef[] = [
    { 
        field: 'img',
        headerName: 'Image',
        cellClassName: 'border-line',
        headerClassName: 'border-line',
        renderCell: ({ row }: GridRenderCellParams ) => {
            return (
                <Link href={ `/product/${ row.slug }` } prefetch={ false } target="_blank">
                    <CardMedia component='img' className="fadeIn" image={ `/products/${ row.img }` } alt={ row.title } />
                </Link>
            )
        }
    },
    { field: 'title', headerName: 'Title', width: 250, cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'gender', headerName: 'Gender', align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'type', headerName: 'Type', align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'inStock', headerName: 'Stock', align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'price', headerName: 'Price', align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line' },
    { field: 'sizes', headerName: 'Sizes', align: 'center', headerAlign: 'center', cellClassName: 'border-line', headerClassName: 'border-line', width: 250 },
]

const ProductsAdmin = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products')

    if( !data && !error ) return (<></>)

    const rows = data!.map( product=> ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: currency.formatUSA(product.price),
        sizes: product.sizes.join(', '),
        slug: product.slug
    }) )

    return (
        <AdminLayout title={`Products ${ data?.length }`} subtitle='Product maintenance' icon={ <CategoryRounded sx={{ mr: 1 }} /> }>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid className="border-line" sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }} disableRowSelectionOnClick columns={ columns } rows={ rows } autoPageSize /* initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 20, 30]} */ />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default ProductsAdmin