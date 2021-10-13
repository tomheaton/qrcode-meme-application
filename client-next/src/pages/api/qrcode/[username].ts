import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const {username} = req.query as {username: string}

    const result = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            memes: true
        }
    })

    if (result) {
        switch (result.method) {
            case "snapchat":
                res.redirect(result.snapchat ? `https://www.snapchat.com/add/${result.snapchat}` : "https://qrcode.tomheaton.dev");
                break;
            case "website":
                res.redirect(result.website ? result.website : "https://qrcode.tomheaton.dev");
                break;
            case "custom":
                /*res.redirect(result.custom ? result.custom : "https://qrcode.tomheaton.dev");*/
                // TODO: remove after elections xD
                res.redirect(result.custom ? result.custom : "https://www.thesubath.com/elections/vote/1647/");
                break;
            case "selected":
                let selected = await result.memes.filter((meme) => meme.id ==result.selected)
                res.redirect(selected && selected.length > 0 ? selected[0].link : "https://qrcode.tomheaton.dev");
                break;
            case "random":
                res.redirect(result.memes[Math.floor(Math.random() * result.memes.length)].link);
                break;
            default:
                res.status(404).end(`Method ${result.method} Not Found`)
                break;
        }
    } else {
        // unlikely, but oh well...
        res.status(404).end(`Method Not Found`)
    }
}

export default handler;