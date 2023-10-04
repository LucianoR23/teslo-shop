import { ShopLayout } from "@/components"
import { Box, Typography } from "@mui/material"


const Custom404 = () => {
    return (
        <ShopLayout title="Page not found" pageDescription="There's nothing to show">
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                <Typography variant="h1" component='h1' fontSize={ 80 } fontWeight={ 200 }>404 |</Typography>
                <Typography marginLeft={ 2 } fontSize={ 30 }>There is nothing here</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404