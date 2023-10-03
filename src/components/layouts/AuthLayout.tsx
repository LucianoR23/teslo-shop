import { Box } from "@mui/material"
import Head from "next/head"
import { ReactNode } from "react"


interface Props {
    title: string
    children: ReactNode
}

export const AuthLayout = ({ children, title }: Props) => {
    return (
        <>

            <Head>
                <title>{ title }</title>
            </Head>

            <Box component='main' display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
                { children }
            </Box>

        </>
    )
}
