import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../lib/prisma";

type Data = {
    data: any[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

/*    const newUser = await prisma.user.create({
        data: {
            username: 'gonk',
            email: "gonk@gonk.com"
        },
    })*/

    const users = await prisma.user.findMany()
    res.status(200).json({ data: users });
}

export default handler;
