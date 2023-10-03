import NextLink from "next/link"
import { Box, Grid, Typography, TextField, Button, Link, IconButton } from "@mui/material"
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import { AuthLayout } from "@/components"
import Image from "next/image";


const RegisterPage = () => {
    return (
        <AuthLayout title={"Register"}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                        <Typography variant="h1" component='h1'>Register</Typography>
                        <Link component={ NextLink } href='/' passHref>
                            <Image src="/favicon.ico" alt="logo vercel" width={40} height={40} />
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Full name' variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Email' variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Password' type="password" variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size="large" fullWidth>
                            Register
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <Link underline="always" component={ NextLink } href='/auth/login' passHref>
                            Already have an account? Sign in
                        </Link>
                    </Grid>

                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage