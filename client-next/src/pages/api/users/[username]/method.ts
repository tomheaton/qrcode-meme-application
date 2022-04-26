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

            console.log(JSON.stringify({ memeMethod }, null, 4));

            // if (memeMethod !== null) {
            //     return res.status(200).json({ message: "found meme method", success: true, data: MemeMethod[memeMethod] });
            // }
            return res.status(200).json({ message: "did not find meme method", success: false });
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
