import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import {MemeMethod} from "@prisma/client";

type Data = {
    message: string
    success: boolean
    data?: MemeMethod
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username } = req.query as { username: string };

    switch (req.method) {
        case ('GET'):
            const memeMethod = await prisma.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    method: true
                }
            });
            return res.status(200).json({ message: "data here", success: true, data: memeMethod });
        case ('PUT'):
            /*
            if (["random", "selected", "custom", "website", "snapchat"].includes(newMode)) {
                data.mode = newMode;
            }
            res.status(200).json(JSON.stringify({ mode: data.mode }));*/
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
