import { FC, ReactNode } from 'react'
import Head from "next/head"
import { Box } from '@mui/material';
import { Navbar, SideMenu } from '..';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: ReactNode
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
    return (
        <>
            <Head>
                <title>{ title }</title>
                <meta name='description' content={ pageDescription } />
                <meta name='og:title' title={ title } />
                <meta name='og:description' title={ pageDescription } />

                {
                    imageFullUrl && (
                        <meta name='og:image' title={ imageFullUrl } />
                    )
                }
            </Head>

            <nav>
                <Navbar />
            </nav>
            <SideMenu />
            <Box component='main' sx={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
                { children }
            </Box>

            <footer>
                
            </footer>
        </>
    )
}
