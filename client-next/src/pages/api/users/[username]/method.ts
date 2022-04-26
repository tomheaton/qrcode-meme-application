import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";

type Data = {
    data: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const _method = req.method;
    const { username } = req.query as { username: string };

    switch (_method) {
        case 'GET':
            const result = await prisma.user.findUnique({
                where: {
                    username: username
                },
                select: {
                    method: true
                }
            });
            res.status(200).json({ data: result });
            break;
        case 'PUT':
            /*
            if (["random", "selected", "custom", "website", "snapchat"].includes(newMode)) {
                data.mode = newMode;
            }
            res.status(200).json(JSON.stringify({ mode: data.mode }));*/
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${_method} Not Allowed`);
            break;
    }
}

export default handler;
