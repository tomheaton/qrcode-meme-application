import type {NextApiRequest, NextApiResponse} from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: please connect to database before this gets worse :peepoSad:
    /*const { mode } = data;

    switch (mode) {
        case "snapchat":
            res.redirect(data.snapchat);
            break;
        case "website":
            res.redirect(data.website);
            break;
        case "custom":
            res.redirect(data.custom);
            break;
        case "selected":
            const selectedId = data.selected;
            const selected = data.memes.filter((o) => o.id === selectedId)
            res.redirect(selected[0].link);
            break;
        case "random":
            res.redirect(data.memes[Math.floor(Math.random() * data.memes.length)].link);
            break;
        default:
            // TODO: refactor "mode" -> "method"
            res.status(404).end(`Mode ${mode} Not Found`)
            break;
    }*/
}

export default handler;
