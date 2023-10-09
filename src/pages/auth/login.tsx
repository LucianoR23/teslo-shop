import { useContext, useState } from 'react';
import NextLink from "next/link"
import Image from "next/image"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { ErrorRounded } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { AuthContext } from '@/context';
import { AuthLayout } from "@/components"
import { validations } from "@/utils"
import { tesloApi } from "@/apis"
import { useRouter } from 'next/router';


type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    
    const router = useRouter()
    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    
    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false)

        const isValidLogin = await loginUser( email, password )
        if( !isValidLogin ){
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }

        const destination = router.query.p?.toString() || '/'
        router.replace(destination)
    }

    return (
        <AuthLayout title={"Sign in"}>
            <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                            <Typography variant="h1" component='h1'>Sign in</Typography>
                            <Link component={ NextLink } href='/' passHref>
                                <Image src="/favicon.ico" alt="logo vercel" width={40} height={40} />
                            </Link>
                            
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                            {...register('email', { 
                                required: 'Email is required',
                                validate: validations.isEmail
                            })} 
                            type="email" 
                            label='Email' 
                            variant="filled" 
                            fullWidth
                            error={ !!errors.email }
                            helperText={ errors.email?.message } />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must have at least 6 characters' }
                            })} 
                            label='Password' 
                            type="password" 
                            variant="filled" 
                            fullWidth
                            error={ !!errors.password }
                            helperText={ errors.password?.message } />
                            <Chip color="error" label="Email or password are incorrect" icon={ <ErrorRounded /> } className="fadeIn"  sx={{ mt: 2, marginX: '10%', display: showError ? 'flex' : 'none' }} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Sign in
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <Link underline="always" component={ NextLink } href={ router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register'} passHref>
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage