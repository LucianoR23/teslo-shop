import { ShopLayout } from "@/components"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"


const AddressPage = () => {
    return (
        <ShopLayout title="Address" pageDescription="Confirm delivery address">

            <Typography variant="h1" component='h1'>Address</Typography>

            <Grid container spacing={2} marginTop={2}>
                
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Name' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Last name' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Address 1' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Address 2 (optional)' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='ZIP Code' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='City' variant="filled" />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select variant="filled" label="Country" value={1}>
                            <MenuItem value={1}>Argentina</MenuItem>
                            <MenuItem value={2}>Uruguay</MenuItem>
                            <MenuItem value={3}>Paraguay</MenuItem>
                            <MenuItem value={4}>Chile</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Phone' variant="filled" />
                </Grid>

            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                <Button color="secondary" className="circular-btn" size="large">
                    Check order
                </Button>
            </Box>

        </ShopLayout>
    )
}

export default AddressPage