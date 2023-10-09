import { useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from "next/link"
import Image from "next/image";
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Grid, Typography, TextField, Button, Link, IconButton, Chip } from "@mui/material"
import ErrorRounded from '@mui/icons-material/ErrorRounded';
import { AuthContext } from '@/context';
import { AuthLayout } from "@/components"
import { validations } from '@/utils';


type FormData = {
    email: string
    password: string
    name: string
}

const RegisterPage = () => {

    const router = useRouter()
    const { registerUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const onRegisterForm = async( { name, email, password }: FormData ) => {

        setShowError(false)
        const { hasError, message } = await registerUser( name, email, password )

        if( hasError ){
            setShowError(true)
            setErrorMessage( message! )
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }
        
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)

        await signIn('credentials', { email, password })
    }

    return (
        <AuthLayout title={"Register"}>
            <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                            <Typography variant="h1" component='h1'>Register</Typography>
                            <Link component={ NextLink } href='/' passHref>
                                <Image src="/favicon.ico" alt="logo vercel" width={40} height={40} />
                            </Link>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            {...register('name', { 
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Name must have at least 2 characters' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                            label='Full name' 
                            variant="filled" 
                            fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            {...register('email', { 
                                required: 'Email is required',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            label='Email'
                            type='email'
                            variant="filled" 
                            fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must have at least 6 characters' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                            label='Password' 
                            type="password" 
                            variant="filled" 
                            fullWidth />
                            <Chip color="error" label={ errorMessage } icon={ <ErrorRounded /> } className="fadeIn"  sx={{ mt: 2, marginX: '10%', display: showError ? 'flex' : 'none' }} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' color="secondary" className="circular-btn" size="large" fullWidth>
                                Register
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <Link underline="always" component={ NextLink } href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'} passHref>
                                Already have an account? Sign in
                            </Link>
                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    const { p = '/' } = query

    if( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: { }
    }
}


export default RegisterPage