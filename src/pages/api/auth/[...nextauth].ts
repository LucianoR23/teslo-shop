import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { jwt } from '@/utils';
import { dbUsers } from "@/database";

export const authOptions: NextAuthOptions = {

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials): Promise<{ id: string; _id: string; email: string; role: string; name: string; } | null>{
                console.log(credentials)

                return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )
            }
        })
    ],

    callbacks: {
        async jwt({ token, account, user }){
            if( account ){
                token.accessToken = account.access_token

                switch( account.type ){
                    case 'oauth':
                        // TODO verificar
                        break

                    case 'credentials':
                        token.user = user
                        break
                }
            }

            return token
        },
        async session({ session, token, user }){

            session.accessToken = token.accessToken as any
            session.user = token.user as any

            return session
        }
    }
}

export default NextAuth(authOptions)