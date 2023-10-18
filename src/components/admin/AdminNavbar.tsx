import { useContext } from "react";
import NextLink from "next/link"
import { AppBar, Link, Toolbar, Typography, Box, Button } from '@mui/material';
import { UIContext } from "@/context";



export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext( UIContext )

    return (
        <AppBar>
            <Toolbar>
                <Link component={ NextLink } href='/' passHref display="flex" alignItems='center'>
                    <Typography variant="h6">Teslo </Typography>
                </Link>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
