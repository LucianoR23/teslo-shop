import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'
import styles from './Slideshow.module.css'
import { Box } from "@mui/material"

interface Props {
    images: string[]
}

export const Slideshow = ({ images }: Props) => {
    return (
        <Slide easing="ease" duration={7000} indicators>
            {
                images.map( img => {
                    const url = `/products/${ img }`
                    return (
                        <div className={ styles['each-slide'] } key={ img }>
                            <Box component='div' style={{ backgroundImage: `url(${ url })`, backgroundSize: 'cover' }}>

                            </Box>
                        </div>
                    )
                } )
            }
        </Slide>
    )
}
