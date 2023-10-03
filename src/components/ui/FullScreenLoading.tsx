import { Box, CircularProgress, Typography } from "@mui/material"


export const FullScreenLoading = () => {
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>

            <CircularProgress thickness={ 2 } size={100} />
            {/* <Typography sx={{ mt: 3 }} variant="h2" fontWeight={200} fontSize={40}>Loading...</Typography> */}
            
        </Box>
    )
}
