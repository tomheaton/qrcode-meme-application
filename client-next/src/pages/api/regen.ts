import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@lib/prisma";

type Data = {
    message: string
    success: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const authorId = 1;

    const data = [
        {
            name: "shrek-allstar",
            link: "https://youtu.be/HLQ1cK9Edhc?t=16"
        },
        {
            name: "chipotle",
            link: "https://youtu.be/8rDNZ5Ebwsc?t=7"
        },
        {
            name: "chickens",
            link: "https://youtu.be/F-X4SLhorvw?t=26"
        },
        {
            name: "dreams-stutter",
            link: "https://youtu.be/G7RgN9ijwE4"
        },
        {
            name: "refrigerators",
            link: "https://youtu.be/TiC8pig6PGE?t=10"
        },
        {
            name: "rickroll",
            link: "https://youtu.be/dQw4w9WgXcQ"
        },
        {
            name: "six-consoles",
            link: "https://youtu.be/RuERcyUwpZk?t=10"
        }
    ]

    try {
        for (const meme of data) {
            const result = await prisma.meme.create({
                data: {
                    ...meme,
                    author: {
                        connect: {
                            id: authorId
                        }
                    }
                }
            });
            console.log(JSON.stringify(result, null, 4));
        }
    } catch (e) {
        return res.status(200).json({ message: "memes not seeded properly", success: false });
    }

    return res.status(200).json({ message: "memes seeded", success: true });
}

export default handler;