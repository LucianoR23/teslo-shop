import { useContext } from 'react';
import { Divider, Grid, Typography } from "@mui/material"
import { CartContext } from "@/context";
import { currency } from '@/utils';


export const OrderSummary = () => {

    const { totalPrice, totalQuantity, subtotalPrice, taxes } = useContext(CartContext)


    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>Products qty.</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{totalQuantity} { totalQuantity > 1 ? 'items' : 'item' }</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatUSA(subtotalPrice)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes ({ Number(process.env.NEXT_PUBLIC_TAX_RATE)*100 }%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatUSA(taxes)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{currency.formatUSA(totalPrice)}</Typography>
            </Grid>

        </Grid>
    )
}
