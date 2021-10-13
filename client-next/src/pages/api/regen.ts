import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../lib/prisma";

type Data = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    //const {username} = req.query as {username: string};

    /*const userId = await prisma.user.findUnique({
        where: {
            username: username
        }
    });*/

    const result = await prisma.meme.createMany({
        data: [
            {
                name: "shrek-allstar",
                link: "https://youtu.be/HLQ1cK9Edhc?t=16",
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
    })

    res.status(200).json({result: true})

}

export default handler;