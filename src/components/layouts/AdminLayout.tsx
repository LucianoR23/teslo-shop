import { ReactNode } from 'react'
import Head from "next/head"
import { Box, Typography } from '@mui/material';
import { AdminNavbar, SideMenu } from '..';


interface Props {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
    children: ReactNode
}

export const AdminLayout = ({ children, title, subtitle, icon }: Props) => {
    return (
        <>

            <nav>
                <AdminNavbar />
            </nav>
            <SideMenu />
            <Box component='main' sx={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
                <Box>
                    <Typography variant='h1' component='h1'>
                        { icon }
                        { title }
                    </Typography>
                    <Typography variant='h2' component='h2' marginBottom={ 1 }>{ subtitle }</Typography>
                </Box>
                <Box component='div' className='fadeIn'>
                    { children }
                </Box>
            </Box>

        </>
    )
}
