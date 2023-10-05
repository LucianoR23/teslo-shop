import { useContext } from 'react';
import { Divider, Grid, Typography } from "@mui/material"
import { CartContext } from "@/context";


export const OrderSummary = () => {

    const { cart } = useContext(CartContext)

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    const subtotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const taxes = subtotalPrice * 0.1
    const totalOrder = taxes + subtotalPrice


    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>Products qty.</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{totalQuantity}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${subtotalPrice}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes (10%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${taxes}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant="subtitle1">${totalOrder}</Typography>
            </Grid>

        </Grid>
    )
}
