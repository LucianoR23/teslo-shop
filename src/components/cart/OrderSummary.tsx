import { Divider, Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>Products qty.</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$405</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes (15%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$60.75</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant="subtitle1">$465.75</Typography>
            </Grid>

        </Grid>
    )
}
