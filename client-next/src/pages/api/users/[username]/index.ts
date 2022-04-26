import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import type {User} from "@prisma/client";

type Data = User | null;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const _method = req.method;
    const { username } = req.query as { username: string};
    const { method, selectedMeme, customUrl } = req.body as { method: string, selectedMeme: any, customUrl: any };

    let result;

    switch (_method) {
        case 'GET':
            result = await prisma.user.findUnique({
                where: {
                    username: username
                },
                include: {
                    memes: true
                }
            });
            res.status(200).json(result);
            break;
        case 'PUT':
            if (["random", "selected", "custom", "website", "snapchat"].includes(method)) {
                switch (method) {
                    case "selected":
                        result = await prisma.user.update({
                            where: {
                                username: username
                            },
                            data: {
                                method: method,
                                selected: selectedMeme
                            }
                        });
                        res.status(200).json(result);
                        break;
                    case "custom":
                        result = await prisma.user.update({
                            where: {
                                username: username
                            },
                            data: {
                                method: method,
                                custom: customUrl
                            }
                        });
                        res.status(200).json(result);
                        break;
                    default:
                        result = await prisma.user.update({
                            where: {
                                username: username
                            },
                            data: {
                                method: method
                            }
                        });
                        res.status(200).json(result);
                        break;
                }
            } else {
                res.status(403).end(`Selected Method ${method} Invalid`);
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${_method} Not Allowed`);
            break;
    }
}

export default handler;
