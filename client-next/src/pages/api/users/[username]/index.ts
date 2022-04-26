import {NextApiRequest, NextApiResponse} from 'next';
import prisma from "@lib/prisma";
import {PrivateUser} from "@lib/types";
import {Meme, MemeMethod} from "@prisma/client";

type Data = {
    message: string
    success: boolean
    data?: PrivateUser | (PrivateUser & Meme[])
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { username } = req.query as { username: string};
    const { method, selectedMeme, customUrl } = req.body as { method: keyof typeof MemeMethod, selectedMeme: any, customUrl: any };

    switch (req.method) {
        case ('GET'):
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                },
                include: {
                    memes: true
                }
            });

            if (user) {
                const { password, ...privateUser } = user;
                return res.status(200).json({ message: "selected", success: true, data: privateUser });
            }
            return res.status(200).json({ message: "no user found", success: false });
        case ('PUT'):
            let result;
            switch (MemeMethod[method]) {
                case (MemeMethod.SELECTED):
                    result = await prisma.user.update({
                        where: {
                            username: username
                        },
                        data: {
                            method: method,
                            selected: selectedMeme
                        },
                        include: {
                            memes: true
                        }
                    });
                    if (result) {
                        const { password, ...privateUser } = result;
                        return res.status(200).json({ message: "selected", success: true, data: privateUser });
                    }
                    return res.status(200).json({ message: "no user found", success: false });
                case (MemeMethod.CUSTOM):
                    result = await prisma.user.update({
                        where: {
                            username: username
                        },
                        data: {
                            method: method,
                            custom: customUrl
                        },
                        include: {
                            memes: true
                        }
                    });
                    if (result) {
                        const { password, ...privateUser } = result;
                        return res.status(200).json({ message: "selected", success: true, data: privateUser });
                    }
                    return res.status(200).json({ message: "no user found", success: false });
                default:
                    return res.status(403).end(`Selected Method ${method} Invalid`);
            }
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
