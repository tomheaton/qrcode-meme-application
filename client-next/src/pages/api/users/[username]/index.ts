import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../../lib/prisma";
import type {User} from "@prisma/client";

type Data = {
    data: User | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username } = req.query as { username: string };

    const result = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            memes: true
        }
    });

    res.status(200).json({ data: result });
}

export default handler;
