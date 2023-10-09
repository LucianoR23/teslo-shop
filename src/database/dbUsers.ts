import { User } from "@/models"
import { db } from "."
import bcrypt from 'bcryptjs';


export const checkUserEmailPassword = async( email: string, password: string ) => {

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    if( !user ){
        return null
    }

    if( !bcrypt.compareSync( password, user.password! ) ){
        return null
    }

    const { role, name, _id } = user

    return {
        id: _id,
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }
}

export const dbUserOAuth = async( OAuthEmail: string, OAuthName: string ) => {

    await db.connect()
    const user = await User.findOne({ email: OAuthEmail })
    
    if( user ){
        await db.disconnect()
        const { _id, email, name, role } = user
        return { _id, email, name, role }
    }

    const newUser = new User({ email: OAuthEmail, name: OAuthName, password: '@', role: 'client' })
    await newUser.save()
    await db.disconnect()

    const { _id, name, email, role } = newUser

    return { _id, name, email, role }
}