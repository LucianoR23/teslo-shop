import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handlerSearch(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Must define the search parameter' })
}