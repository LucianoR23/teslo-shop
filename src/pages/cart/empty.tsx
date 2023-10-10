import { useEffect } from "react"
import { useRouter } from "next/router"
import NextLink from "next/link"
import Cookies from "js-cookie"
import { RemoveShoppingCartRounded } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "@/components"


const EmptyPage = () => {
    const router = useRouter()
    
    useEffect(() => {
        setTimeout(() => {
            if( Cookies.get('cart') ){
                router.replace('/cart')
            }
            
        }, 1000);
        
    }, [])

    return (
        <ShopLayout title="Empty cart" pageDescription="There are no items in the shopping cart" >
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                <RemoveShoppingCartRounded sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignContent='center'>
                    <Typography>Your cart is empty</Typography>
                    <Link component={ NextLink } href='/' passHref typography='h4' color='secondary'>
                        Return
                    </Link>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyPage