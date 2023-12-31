import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, FormGroup, Checkbox, Chip, Card, CardMedia, CardActions } from "@mui/material";
import { AdminLayout } from "@/components";
import { dbProducts } from "@/database";
import { IProduct, ISize, IType } from "@/interfaces";
import { tesloApi } from '@/apis';
import { Product } from '@/models';

const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
}

interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {

    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type } ) => {
            if( name === 'title' ){
                const newSlug = value.title?.trim().replaceAll(' ', '_').replaceAll("'", "").replaceAll('"', '').toLocaleLowerCase() || ''
                setValue('slug', newSlug)
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, setValue])

    
    

    const onChangeSize = ( size: string ) => {
        const  currentSize = getValues('sizes')
        if( currentSize.includes( size ) ){
            return setValue('sizes', currentSize.filter( s => s !== size ), { shouldValidate: true })
        }

        setValue('sizes', [...currentSize, size], { shouldValidate: true })
    }

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase()
        setNewTagValue('')
        const currentTags = getValues('tags')

        if( currentTags.includes(newTag) ) return;

        currentTags.push(newTag)
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t !== tag )
        setValue('tags', updatedTags, { shouldValidate: true })
    }

    const onFilesSelected = async( {target}: ChangeEvent<HTMLInputElement> ) => {
        if( !target.files || target.files.length === 0 ){
            return
        }

        
        try {
            
            for (const file of target.files) {
                const formData = new FormData()
                formData.append('file', file)
                const { data } = await tesloApi.post<{ message: string }>('/admin/upload', formData)
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true })
            }

        } catch (error) {
            console.log({error})
        }
    }

    const onDeleteImage = ( image: string ) => {
        setValue('images', getValues('images').filter( img => img !== image ), { shouldValidate: true })
    }

    const onSubmit = async( form: FormData ) => {
        if( form.images.length < 2 ) return alert('2 images are required')
        setIsSaving(true)
        
        try {
            
            const { data } = await tesloApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })


            if( !form._id ){
                router.replace(`/admin/products/${ form.slug }`)
            }else{
                setIsSaving(false)
            }

        } catch (error) {
            console.log(error)
            setIsSaving(false)
        }


    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subtitle={`Editando: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Save
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'This field is required',
                                minLength: { value: 2, message: 'At least 2 characters' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Description"
                            variant="filled"
                            fullWidth 
                            multiline={ true }
                            rows={ 8 }
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'This field is required'
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="In stock"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'This field is required',
                                min: { value: 0, message: 'Min value of 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Price"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'This field is required',
                                min: { value: 0, message: 'Min value of 0' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ ({ target }) => setValue('type', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({ target }) => setValue('gender', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Sizes</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel 
                                        key={size} 
                                        control={<Checkbox checked={ getValues('sizes').includes(size) } />} 
                                        label={ size } 
                                        onChange={ () => onChangeSize(size) }
                                        />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'This field is required',
                                validate: (val) => val.trim().includes(' ') ? 'Cannot contain whitespaces' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Tags"
                            variant="filled"
                            fullWidth
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue( target.value ) }
                            onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : undefined }
                            sx={{ mb: 1 }}
                            helperText="Press [spacebar] to add"
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Images</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Upload image
                            </Button>
                            <input ref={ fileInputRef } type='file' multiple accept='image/png, image/gif, image/jpeg' style={{ display: 'none' }} onChange={ onFilesSelected } />

                            <Chip 
                                label="2 images is necessary"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error" onClick={ () => onDeleteImage(img) }>
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;

    let product: IProduct | null;

    if( slug === 'new' ){

        const tempProduct = JSON.parse( JSON.stringify( new Product() ) )
        delete tempProduct._id
        tempProduct.images = ['img1.jpg', 'img2.jpg']
        product = tempProduct

    }else{
        product = await dbProducts.getProductSlug(slug.toString());
    }
    

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage