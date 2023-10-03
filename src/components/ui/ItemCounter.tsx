import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"


interface Props {

}

export const ItemCounter = () => {
    return (
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleRounded />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
            <IconButton color="secondary">
                <AddCircleRounded />
            </IconButton>
        </Box>
    )
}
