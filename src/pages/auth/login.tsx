import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import NextLink from "next/link"
import Image from "next/image"
import { getSession, signIn, getProviders } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material"
import { ErrorRounded } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { AuthLayout } from "@/components"
import { validations } from "@/utils"


type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders().then( prov => {
            setProviders( prov )
        } )
    }, [])
    

    
    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false)

        await signIn('credentials', { email, password })

        


        // const isValidLogin = await loginUser( email, password )
        // if( !isValidLogin ){
        //     setShowError(true)
        //     setTimeout(() => {
        //         setShowError(false)
        //     }, 3000);
        //     return
        // }

        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
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

                            <Divider sx={{ width: '100%', my: 2 }} />
                        <Grid item xs={12} display='flex' justifyContent='space-evenly'>

                            {
                                Object.values( providers ).map( (provider: any) => {
                                    if( provider.id === 'credentials') return (<Box key="credentials" display='none'></Box>)

                                    const icons: { [key: string]: JSX.Element } = {
                                        'github': <GitHubIcon />,
                                        'google': <GoogleIcon />,
                                        // Añade aquí otros iconos según sea necesario
                                    };

                                    return (
                                        <Button 
                                        color='primary'
                                        size='large'
                                        key={ provider.id }
                                        startIcon={ icons[provider.name.toLowerCase()] }
                                        onClick={() => signIn(provider.id)}
                                        >
                                            { provider.name }
                                        </Button>
                                    )
                                })
                            }
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

export default LoginPage