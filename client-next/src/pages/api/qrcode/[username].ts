import {NextApiRequest, NextApiResponse} from 'next';
// import prisma from "@lib/prisma";
// import {QRCODE_LINK} from "@lib/consts";
// import {MemeMethod} from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: fix database
    return res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");

    /*const { username } = req.query as { username: string };

    const result = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            memes: true
        }
    });

    if (result) {
        switch (result.method) {
            case (MemeMethod.SNAPCHAT):
                return res.redirect(result.snapchat ? `https://www.snapchat.com/add/${result.snapchat}` : QRCODE_LINK);
            case (MemeMethod.WEBSITE):
                return res.redirect(result.website ? result.website : QRCODE_LINK);
            case (MemeMethod.CUSTOM):
                return res.redirect(result.custom ? result.custom : QRCODE_LINK);
            case (MemeMethod.SELECTED):
                const selected = await result.memes.filter((meme) => meme.id == result.selected);
                return res.redirect(selected && selected.length > 0 ? selected[0].link : QRCODE_LINK);
            case (MemeMethod.RANDOM):
                return res.redirect(result.memes[Math.floor(Math.random() * result.memes.length)].link);
            default:
                return res.status(404).end(`Method ${result.method} Not Found`);
        }
    }

    // unlikely, but oh well...
    return res.status(404).end("Method Not Found");*/
}

export default handler;
