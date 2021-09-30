import {useRouter} from "next/router";
import QRCode from "react-qr-code";
import {useState, useEffect, FormEvent} from "react";
import axios from "axios";
import {NextPage} from "next";

const ProfilePage: NextPage = () => {

    const selectedStyle = "border-l border-t border-r rounded-t bg-white inline-block py-2 px-4 text-blue-500 font-semibold";
    const unselectedStyle = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold";

    const router = useRouter();
    const { username } = router.query;

    //const [mode, setMode] = useState<"random"|"selected"|"website"|"snapchat"|"custom">();
    const [mode, setMode] = useState<any>();
    //const [tab, setTab] = useState<"qrcode"|"settings"|"other">("qrcode");
    const [tab, setTab] = useState<string>("qrcode");
    const [showError, setShowError] = useState<boolean>(false);
    const [memes, setMemes] = useState<[]>([]);
    const [chosenMeme, setChosenMeme] = useState<number>(0);

    useEffect(() => {
        axios.get(`/api/data`).then(result => {
            setMode(result.data.mode);
        }).catch((error) => {
            setShowError(true);
            console.log("error", error);
        });
    },[]);

    useEffect(() => {
        fetchMemes();
    },[mode==="selected"]);

    // TODO: this.
    const handleSave = () => {
/*        axios.post(`/api/data/${username}`).then(result => {
            setMode(result.data.mode);
        }).catch((error) => {
            console.log("error", error);
        });*/
    }

    // TODO: this.
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("submitting...");
        await handleSave();
    }

    const fetchMemes = async () => {
        await axios.get("/api/data").then((result) => {
            setMemes(result.data.memes);
        });
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-2 pt-10">
            { showError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Holy smokes!</strong>
                    <span className="block sm:inline">Something seriously bad happened.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>
                </div>
            )}
            <p>{mode}, {tab}</p>
            <h1 className={"font-bold text-5xl"}>Profile</h1>
            <br/>
            <h2 className={"font-bold text-3xl"}>{username}</h2>
            <br/>
            <ul className="flex border-b">
                <li className="-mb-px mr-1">
                    <button onClick={() => {setTab("qrcode")}} className={tab==="qrcode" ? selectedStyle : unselectedStyle}>
                        QR Code
                    </button>
                </li>
                <li className="mr-1">
                    <button onClick={() => {setTab("settings")}} className={tab==="settings" ? selectedStyle : unselectedStyle}>
                        Settings
                    </button>
                </li>
                <li className="mr-1">
                    <button onClick={() => {setTab("other")}} className={tab==="other" ? selectedStyle : unselectedStyle}>
                        Other
                    </button>
                </li>
            </ul>
            <div>
                {tab==="qrcode" && (
                    <div className={"p-10"}>
                        <QRCode value={`https://qrcode.tomheaton.dev/api/qrcode/${username}`}/>
                    </div>
                )}
                {tab==="settings" && (
                    <div className={"p-10 items-center"} style={{border: "red solid 1px"}}>
                        <form className="w-full max-w-sm md:w-80" onSubmit={handleSubmit}>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Mode
                                    </label>
                                </div>
                                <div className="md:w-2/3 inline-block relative">
                                    <select value={mode} onChange={(e) => {setMode(e.target.value)}}
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                        <option value={"random"}>Random Meme</option>
                                        <option value={"selected"}>Selected Meme</option>
                                        <option value={"website"}>Website</option>
                                        <option value={"snapchat"}>Snapchat</option>
                                        <option value={"custom"}>Custom</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            { memes.length > 0 && mode==="selected" && (
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                            Meme
                                        </label>
                                    </div>
                                    <div className="md:w-2/3 inline-block relative">
                                        <select onChange={(e) => {setChosenMeme(e.target.selectedIndex)}}
                                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            {
                                                memes.map((element: {name: string}, index: number) => {
                                                    return (<option value={index}>{element.name}</option>);
                                                })
                                            }
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3"/>
                                <div className="md:w-2/3">
                                    <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {tab==="other" && (
                    <div className={"p-10"}>
                        <h3 className={"font-bold text-2xl"}>other</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;