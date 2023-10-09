import { useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, NoSsr, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "@/components"
import { countries } from "@/utils"
import { CartContext } from '@/context';


type FormData = {
    firstName: string
    lastName: string
    address: string
    address2?: string
    zip: string
    city: string
    country: string
    phone: string
}

const getAddressCookies = ():FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter()
    const { updateAddress, cart } = useContext( CartContext )
    

    // if( cart.length === 0){

    // }

    const { register, handleSubmit, formState: { errors,  }, getValues } = useForm<FormData>({
        defaultValues: getAddressCookies()
    })

    const onSubmitAddress = ( data: FormData ) => {

        updateAddress( data )
        router.push('/checkout/summary')
    }
    
    return (
        <ShopLayout title="Address" pageDescription="Confirm delivery address">

            <Typography variant="h1" component='h1'>Address</Typography>
            <form onSubmit={ handleSubmit( onSubmitAddress ) } noValidate>
                
                <Grid container spacing={2} marginTop={2}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth
                        label='First name' 
                        variant="filled"
                        {...register('firstName', { 
                            required: 'First name is required',
                            minLength: { value: 2, message: 'First name must have at least 2 characters' }
                        })}
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        label='Last name' 
                        variant="filled"
                        {...register('lastName', { 
                            required: 'Last name is required',
                            minLength: { value: 2, message: 'Last name must have at least 2 characters' }
                        })}
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        label='Address 1' 
                        variant="filled"
                        {...register('address', { 
                            required: 'Address is required'
                        })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        label='Address 2 (optional)' 
                        variant="filled"
                        {...register('address2')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        label='ZIP Code' 
                        variant="filled"
                        {...register('zip', { 
                            required: 'Zip code is required'
                        })}
                        error={ !!errors.zip }
                        helperText={ errors.zip?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        label='City' 
                        variant="filled"
                        {...register('city', { 
                            required: 'City is required'
                        })}
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <NoSsr>
                            <FormControl fullWidth >
                                <Select 
                                variant="filled" 
                                label="Country" 
                                defaultValue={ Cookies.get('country') || countries[0].code }
                                {...register('country', { 
                                    required: 'Country is required'
                                })}
                                error={ !!errors.country }
                                // helperText={ errors.country?.message }
                                >
                                    {
                                        countries.map( country => (
                                            <MenuItem key={ country.code } value={ country.code }>{ country.name }</MenuItem>

                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </NoSsr>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField 
                        fullWidth 
                        type='number'
                        label='Phone' 
                        variant="filled"
                        {...register('phone', { 
                            required: 'Phone is required'
                        })}
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                        />
                    </Grid>

                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                    <Button type='submit' color="secondary" className="circular-btn" size="large">
                        Check order
                    </Button>
                </Box>

            </form>

        </ShopLayout>
    )
}



// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
//     const { token = '' } = req.cookies
//     let isValidToken = false
//     try {
//         await jwt.isValidToken( token )
//         isValidToken = true
//     } catch (error) {
//         isValidToken = false
//     }

//     if( !isValidToken ){
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }


export default AddressPage