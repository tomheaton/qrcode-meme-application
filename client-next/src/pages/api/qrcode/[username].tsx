import type {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../../../data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    //const { slug } = req.query as { slug: string };
    //const selectedId = data.selected;
    // const selected = data.memes.filter((o) => o.id === selectedId)
    // res.redirect(selected[0].link);
    res.redirect(data.memes[Math.floor(Math.random() * data.memes.length)].link);
}

export default handler;
