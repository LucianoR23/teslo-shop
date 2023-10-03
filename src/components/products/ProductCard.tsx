import { useMemo, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'
import { IProduct } from '@/interfaces'


interface Props {
    product: IProduct
}

export const ProductCard = ({ product }: Props) => {

    const [isHovered, setIsHovered] = useState( false )

    const productImg = useMemo(() => {
        return isHovered ? `products/${ product.images[1] }` : `products/${ product.images[0] }`
    }, [ isHovered, product.images ])

    return (
        <Grid item xs={6} sm={4} onMouseEnter={ () => setIsHovered( true ) } onMouseLeave={ () => setIsHovered( false ) }>
            <Card>
                    <Link component={ NextLink } href='/product/slug' passHref prefetch={ false }>
                        <CardActionArea>
                            <CardMedia className='fadeIn' component='img' image={ productImg } alt={ product.title } />
                        </CardActionArea>
                    </Link>
            </Card>
            

            <Box sx={{ mt: 1 }} component='div' className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={500}>${ product.price }</Typography>
            </Box>

        </Grid>
    )
}
