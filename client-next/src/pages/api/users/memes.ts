import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import {Meme} from "@prisma/client";
import {applyCookieMiddleware} from "@lib/middleware";
import prisma from "@lib/prisma";

type Data = {
    message: string
    success: boolean
    memes?: Meme[]
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const user = await applyCookieMiddleware(req, res);

    if (!user) {
        return res.status(401).json({ message: "no user found", success: false });
    }

    const memes = await prisma.meme.findMany({
        where: {
            authorId: user.id
        }
    });

    if (memes) {
        return res.status(200).json({ message: "memes found", success: true, memes: memes });
    }

    return res.status(200).json({ message: "no memes found", success: false });
}

export default handler;