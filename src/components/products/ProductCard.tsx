import { useMemo, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Skeleton, Chip } from '@mui/material'
import { IProduct } from '@/interfaces'


interface Props {
    product: IProduct
}

export const ProductCard = ({ product }: Props) => {

    const [isHovered, setIsHovered] = useState( false )
    const [isImageLoaded, setIsImageLoaded] = useState( false )

    const productImg = useMemo(() => {
        return isHovered ? product.images[1] : product.images[0]
    }, [ isHovered, product.images ])

    return (
        <Grid item xs={6} sm={4} onMouseEnter={ () => setIsHovered( true ) } onMouseLeave={ () => setIsHovered( false ) }>
            
            <Card>
                    <Link component={ NextLink } href={`/product/${ product.slug }`} passHref prefetch={ false }>
                        <CardActionArea>
                            {
                                (product.inStock === 0) && (<Chip color='primary' label="Out of stock" sx={{ position: 'absolute', zIndex: 99, left: 5, top: 5 }} />)
                            }
                            <CardMedia className='fadeIn' component='img' image={ productImg } alt={ product.title } onLoad={ () => setIsImageLoaded(true) } />
                        </CardActionArea>
                    </Link>
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} component='div' className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={500}>${ product.price }</Typography>
            </Box>

        </Grid>
    )
}
