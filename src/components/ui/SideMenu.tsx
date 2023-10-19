import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { Avatar, Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardRounded, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UIContext } from "@/context"
import { useSession } from "next-auth/react"


export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UIContext )
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
    const router = useRouter()
    const { data } = useSession()
    const displayLetter = data?.name?.charAt(0)

    const [searchTerm, setSearchTerm] = useState('')

    const onSearch = () => {
        if( searchTerm.trim().length <= 2 ) return

        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu()
        router.push( url )
    }

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleSideMenu }
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                
                <List>

                
                    <ListItem>
                        <Input
                            autoFocus={ true }
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyUp={ (e) => e.key === 'Enter' ? onSearch() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ onSearch }
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItemButton sx={{ display: !isLoggedIn ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <Avatar sx={{ width: 30, height: 30 }} alt={ data?.name } src={ data?.image }>{displayLetter}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/orders/history') } sx={{ display: !isLoggedIn ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'My orders'} />
                    </ListItemButton>


                    <ListItemButton onClick={ () => navigateTo('/category/men') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Men'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/women') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Women'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/kids') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Kids'} />
                    </ListItemButton>


                    <ListItemButton sx={{ display: isLoggedIn ? 'none' : 'flex' }} onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) } >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Sign in'} />
                    </ListItemButton>

                    <ListItemButton onClick={ logoutUser } sx={{ display: !isLoggedIn ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Log out'} />
                    </ListItemButton>


                    {/* Admin */}
                    <Box display={ isLoggedIn && user?.role === ('admin' || 'super-user') ? 'block' : 'none' }>

                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItemButton onClick={ () => navigateTo('/admin') }>
                            <ListItemIcon>
                                <DashboardRounded />
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItemButton>
                        <ListItemButton onClick={ () => navigateTo('/admin/products') }>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Products'} />
                        </ListItemButton>
                        <ListItemButton onClick={ () => navigateTo('/admin/orders') }>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Orders'} />
                        </ListItemButton>

                        <ListItemButton onClick={ () => navigateTo('/admin/users') }>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Users'} />
                        </ListItemButton>
                    </Box>
                </List>
            </Box>
        </Drawer>
    )
}