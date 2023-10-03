import NextLink from "next/link"
import { Box, Grid, Typography, TextField, Button, Link, IconButton } from "@mui/material"
import { AuthLayout } from "@/components"


const RegisterPage = () => {
    return (
        <AuthLayout title={"Register"}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Register</Typography>
                        <IconButton>
                            
                        </IconButton>
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