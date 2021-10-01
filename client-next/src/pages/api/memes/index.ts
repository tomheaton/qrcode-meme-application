import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";

type Data = {
    data: any[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const memes = await prisma.meme.findMany()
    res.status(200).json({ data: memes });
}

export default handler;
