import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useState } from "react"


interface Props {
    currentValue: number
    maxValue: number

    updatedQuantity: (newValue: number) => void
}

export const ItemCounter = ({ currentValue, maxValue, updatedQuantity }: Props ) => {

    const addOrRemove = ( newValue: number ) => {
        if( newValue === -1 ){
            if( currentValue === 1 ) return

            updatedQuantity( currentValue - 1 )
        }
        if( newValue === 1 ){
            if( currentValue >= maxValue ) return

            updatedQuantity( currentValue + newValue )
        }
    }

    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={ () => addOrRemove(-1) }>
                <RemoveCircleRounded />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{ currentValue }</Typography>
            <IconButton onClick={ () => addOrRemove(1) } color="secondary">
                <AddCircleRounded />
            </IconButton>
        </Box>
    )
}
