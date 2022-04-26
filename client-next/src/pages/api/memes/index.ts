import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import {Meme} from "@prisma/client";

type Data = Meme[] | null

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username } = req.query as { username: string };

    const result = await prisma.meme.findMany({
        where: {
            author: {
                username: username
            }
        },
        orderBy: {
            id: "desc"
        }
    })

    res.status(200).json(result);
}

export default handler;
