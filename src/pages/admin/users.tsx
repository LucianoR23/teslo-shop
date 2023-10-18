import { useEffect, useState } from "react";
import useSWR from "swr";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PeopleRounded } from '@mui/icons-material'
import { Grid, MenuItem, Select } from "@mui/material";
import { AdminLayout } from '@/components'
import { IUser } from "@/interfaces";
import { tesloApi } from "@/apis";


const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/user')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if( data ){
            setUsers( data )
        }
    
    }, [ data ])
    

    if( !data && !error ) return (<></>)

    const onRoleUpdated = async( userId: string, newRole: string ) => {

        const previousUsers = users.map( user => ({ ...user }) )
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }) )

        setUsers( updatedUsers )

        try {

            await tesloApi.put('/admin/user', { userId, role: newRole })

        } catch (error) {
            console.log(error)
            setUsers( previousUsers )
            alert('Could not update user role')
        }

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 250 },
        { field: 'email', headerName: "Email", width: 250 },
        { field: 'name', headerName: "Full name", width: 300 },
        {
            field: 'role', 
            headerName: "Role", 
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {

                return (
                    <Select value={ row.role } label="Role" sx={{ width: '300px' }} onChange={ ({target}) => onRoleUpdated( row.id, target.value ) }>
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='super-user'>Super-user</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                    </Select>
                )
            }
        },
    ]

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }) )

    return (
        <AdminLayout title='Users' subtitle='User maintenance' icon={ <PeopleRounded sx={{ mr: 1 }} /> }>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid disableRowSelectionOnClick columns={ columns } rows={ rows } autoPageSize /* initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} pageSizeOptions={[10, 20, 30]} */ />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default UsersPage