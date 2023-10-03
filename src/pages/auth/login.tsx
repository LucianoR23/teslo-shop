import NextLink from "next/link"
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "@/components"
import Image from "next/image"


const LoginPage = () => {
    return (
        <AuthLayout title={"Sign in"}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                        <Typography variant="h1" component='h1'>Sign in</Typography>
                        <Link component={ NextLink } href='/' passHref>
                            <Image src="/favicon.ico" alt="logo vercel" width={40} height={40} />
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Email' variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Password' type="password" variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size="large" fullWidth>
                            Sign in
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <Link underline="always" component={ NextLink } href='/auth/register' passHref>
                            Don't have an account? Register
                        </Link>
                    </Grid>

                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage