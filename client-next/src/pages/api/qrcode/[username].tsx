import type {NextApiRequest, NextApiResponse} from 'next';
import {data} from "../../../data";

type ReqData = {
    query: {
        username: string
    }
}

const handler = (req: ReqData, res: NextApiResponse) => {

    const selectedId = data.selected;
    // const selected = data.all.filter((o) => o.id === selectedId)
    // res.redirect(selected[0].link);
    res.redirect(data.all[Math.floor(Math.random() * data.all.length)].link);
}

export default handler;
