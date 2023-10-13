import { FC, useContext } from 'react';
import { Divider, Grid, Typography } from "@mui/material"
import { CartContext } from "@/context";
import { currency } from '@/utils';


interface Props {
    values?: {
        subtotalPrice: number;
        taxes: number;
        totalPrice: number;
        totalQuantity: number;
    }
}

export const OrderSummary: FC<Props> = ({ values }) => {


    const { totalPrice, totalQuantity, subtotalPrice, taxes } = useContext(CartContext)
    const contextValues = { totalPrice, totalQuantity, subtotalPrice, taxes }

    const valuesToShow = values ? values : contextValues

    return (
        <Grid container>

            <Grid item xs={6}>
                <Typography>Products qty.</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ valuesToShow.totalQuantity } { valuesToShow.totalQuantity > 1 ? 'items' : 'item' }</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatUSA( valuesToShow.subtotalPrice )}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Taxes ({ Number(process.env.NEXT_PUBLIC_TAX_RATE)*100 }%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.formatUSA( valuesToShow.taxes )}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{currency.formatUSA( valuesToShow.totalPrice )}</Typography>
            </Grid>

        </Grid>
    )
}
