import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UIContext } from "@/context"


export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UIContext )
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
    const router = useRouter()

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
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: !isLoggedIn ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItemButton>


                    <ListItemButton onClick={ () => navigateTo('/category/men') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/women') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItemButton>

                    <ListItemButton onClick={ () => navigateTo('/category/kids') } sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItemButton>


                    <ListItemButton sx={{ display: isLoggedIn ? 'none' : 'flex' }} onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItemButton>

                    <ListItemButton onClick={ logoutUser } sx={{ display: !isLoggedIn ? 'none' : 'flex' }}>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItemButton>


                    {/* Admin */}
                    <Box display={ isLoggedIn && user?.role === 'admin' ? 'block' : 'none' }>

                        <Divider />
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItemButton>
                    </Box>
                </List>
            </Box>
        </Drawer>
    )
}