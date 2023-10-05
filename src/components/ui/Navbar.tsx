import { useContext, useState } from "react";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from '@mui/material';
import SearchRounded from "@mui/icons-material/SearchRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import { CartContext, UIContext } from "@/context";
import ClearRounded from "@mui/icons-material/ClearRounded";


export const Navbar = () => {

    const { toggleSideMenu } = useContext( UIContext )
    const { cart } = useContext( CartContext )
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

    const { asPath, push } = useRouter()
    const activeMen = asPath.includes('/men')
    const activeWomen = asPath.includes('/women')
    const activeKid = asPath.includes('/kids')

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearch = () => {
        if( searchTerm.trim().length <= 2 ) return

        push( `/search/${ searchTerm }` )
    }
    

    return (
        <AppBar>
            <Toolbar>
                <Link component={ NextLink } href='/' passHref display="flex" alignItems='center'>
                    <Typography variant="h6">Teslo </Typography>
                    {/* <Typography sx={{ ml: 1 }} >Shop</Typography> */}
                </Link>

                <Box flex={ 1 } />

                <Box component='div' className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
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

                

                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className="fadeIn"
                                autoFocus={ true }
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyUp={ (e) => e.key === 'Enter' ? onSearch() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearRounded />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton className="fadeIn" onClick={ () => setIsSearchVisible(true) } sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <SearchRounded />
                            </IconButton>
                        )
                }

                

                <IconButton onClick={ toggleSideMenu } sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    <SearchRounded />
                </IconButton>

                <Link component={ NextLink } href='/cart' passHref>
                    <IconButton>
                        <Badge badgeContent={ totalQuantity > 9 ? `+9` : totalQuantity } color="secondary">
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
