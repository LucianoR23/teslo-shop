import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { User } from '@/models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '@/utils';

type Data = 
| { message: string }
| { token: string, user: { email: string, name: string, role: string } }

export default function handlerRegister(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'POST':
            return registerUser( req, res )
    
        default:
            res.status(400).json({ message: 'Method does not exist' })
    }

    res.status(200).json({ message: 'Example' })
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string }

    

    if( email.trim().length === 0 || name.trim().length === 0 || password.trim().length === 0 ){
        return res.status(400).json({ message: 'Please fill all inputs' })
    }

    if( password.length < 6 ){
        return res.status(400).json({ message: 'Password must have at least 6 characters' })
    }

    if( name.length < 2 ){
        return res.status(400).json({ message: 'Name must have at least 2 characters' })
    }
    //TODO valid email
    if( !validations.isValidEmail( email ) ){
        return res.status(400).json({ message: 'Email is not valid' })
    }

    await db.connect()
    const user = await User.findOne({ email })
    
    if( user ){
        await db.disconnect()
        return res.status(400).json({ message: 'Email is already in use' })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name
    })

    try {
        await newUser.save({ validateBeforeSave: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Check server logs' })
    }

    const { _id, role } = newUser
    const token = jwt.signToken( _id, email )

    return res.status(200).json({
            user: {
                email, role, name
            },
            token
    })

}
