import { useContext } from "react";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import SearchRounded from "@mui/icons-material/SearchRounded";
import { ShoppingCartRounded } from "@mui/icons-material";
import { UIContext } from "@/context";


export const Navbar = () => {

    const { toggleSideMenu } = useContext( UIContext )

    const { asPath } = useRouter()
    const activeMen = asPath.includes('/men')
    const activeWomen = asPath.includes('/women')
    const activeKid = asPath.includes('/kids')
    

    return (
        <AppBar>
            <Toolbar>
                <Link component={ NextLink } href='/' passHref display="flex" alignItems='center'>
                    <Typography variant="h6">Teslo </Typography>
                    {/* <Typography sx={{ ml: 1 }} >Shop</Typography> */}
                </Link>

                <Box flex={ 1 } />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Link component={ NextLink } href='/category/men' passHref>
                        <Button color={ activeMen ? 'primary' : 'info' }>Men</Button>
                    </Link>
                    <Link component={ NextLink } href='/category/women' passHref>
                        <Button color={ activeWomen ? 'primary' : 'info' }>Women</Button>
                    </Link>
                    <Link component={ NextLink } href='/category/kids' passHref>
                        <Button color={ activeKid ? 'primary' : 'info' }>Kids</Button>
                    </Link>
                </Box>

                <Box flex={ 1 } />

                <IconButton>
                    <SearchRounded />
                </IconButton>

                <Link component={ NextLink } href='/cart' passHref>
                    <IconButton>
                        <Badge badgeContent={ 2 } color="secondary">
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                </Link>

                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
