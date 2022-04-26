import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import {Meme} from "@prisma/client";

type Data = {
    message: string
    success: boolean
    data?: Meme[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    // const {username} = req.query as { username: string };

    const result = await prisma.meme.findMany({
        // where: {
        //     author: {
        //         username: username
        //     }
        // },
        // orderBy: {
        //     id: "desc"
        // }
    })

    if (result) {
        return res.status(200).json({ message: "memes found", success: true, data: result });
    }
    return res.status(200).json({ message: "no memes found", success: false });
}

export default handler;
