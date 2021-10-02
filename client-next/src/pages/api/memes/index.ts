import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";
import type {Meme} from "@prisma/client";

type Data = {
    data: Meme[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username } = req.query as { username: string };

    const result = await prisma.meme.findMany({
        where: {
            author: {
                username: username
            }
        }
    })

    res.status(200).json({ data: result });
}

export default handler;
