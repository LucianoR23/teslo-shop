import { ISize } from "@/interfaces";
import { Box, Button } from "@mui/material";


interface Props {
    selectedSize?: ISize;
    sizes: ISize[]

    onSelectedSize: ( size: ISize ) => void
}

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {

    return (
        <Box>
            {
                sizes.map( size => (
                    <Button onClick={ () => onSelectedSize(size) } key={ size } size="small" color={ selectedSize === size ? 'primary' : 'info' }>
                        { size }
                    </Button>
                ) )
            }
        </Box>
    )
}
