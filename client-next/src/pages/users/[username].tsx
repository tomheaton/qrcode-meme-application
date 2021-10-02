import {useRouter} from "next/router";
import QRCode from "react-qr-code";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {NextPage} from "next";
import type {Meme} from "@prisma/client";

const ProfilePage: NextPage = () => {

    const selectedStyle = "border-l border-t border-r rounded-t bg-white inline-block py-2 px-4 text-blue-500 font-semibold";
    const unselectedStyle = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold";

    const router = useRouter();
    const username = router.query.username;

    //const [mode, setMode] = useState<"random"|"selected"|"website"|"snapchat"|"custom">();
    const [method, setMethod] = useState<string>();
    //const [tab, setTab] = useState<"qrcode"|"settings"|"other">("qrcode");
    const [tab, setTab] = useState<string>("qrcode");
    const [showError, setShowError] = useState<boolean>(false);
    const [memes, setMemes] = useState<[]>([]);
    const [selectedMeme, setSelectedMeme] = useState<number>(1);
    const [customUrl, setCustomUrl] = useState<string>("");

    // TODO: use Next.js initial props?
    useEffect(() => {
        //username = router.query.username;
        (async () => {
            axios.get(`http://localhost:3000/api/users/${username}/method`).then(result => {
                setMethod(result.data.method);
            }).catch((error) => {
                console.log("error", error);
            });
        })();
        fetchMemes()
    },[]);

    useEffect(() => {
        fetchMemes();
    }, [method])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await handleSave();
    }

    // TODO: this.
    const handleSave = () => {
        axios.put(`http://localhost:3000/api/users/${username}`,
            { method: method, selectedMeme: selectedMeme, customUrl: customUrl }
        ).then(result => {
            console.log("result", result)
        }).catch((error) => {
            console.log("error", error);
        });
    }

    const fetchMemes = async () => {
        await axios.get(`http://localhost:3000/api/memes?username=${username}`).then((result) => {
            setMemes(result.data.data);
            console.log("meme data", result.data)
        }).catch((error) => {
            console.log("error", error)
        });
    }

    const handleDownload = () => {
        // Credit to Ross Khanas (https://rosskhanas.github.io/react-qr-code/)
        const svg = document.getElementById("QRCode");
        // @ts-ignore
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // @ts-ignore
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "QRCode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-2 pt-10">
            <h1 className={"font-bold text-5xl"}>Profile</h1>
            <br/>
            <h2 className={"font-bold text-3xl"}>{username}</h2>
            <br/>
            <ul className="flex border-b">
                <li className={`mr-1 ${tab==="qrcode" && "-mb-px"}`}>
                    <button onClick={() => {setTab("qrcode")}} className={tab==="qrcode" ? selectedStyle : unselectedStyle}>
                        QR Code
                    </button>
                </li>
                <li className={`mr-1 ${tab==="settings" && "-mb-px"}`}>
                    <button onClick={() => {setTab("settings")}} className={tab==="settings" ? selectedStyle : unselectedStyle}>
                        Settings
                    </button>
                </li>
                <li className={`mr-1 ${tab==="other" && "-mb-px"}`}>
                    <button onClick={() => {setTab("other")}} className={tab==="other" ? selectedStyle : unselectedStyle}>
                        Other
                    </button>
                </li>
            </ul>
            <div>
                {tab==="qrcode" && (
                    <div className={"p-10"}>
                        <QRCode id={"QRCode"} value={`https://qrcode.tomheaton.dev/api/qrcode/${username}`}/>
                        <div className="flex items-center justify-center p-4">
                            <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Download
                            </button>
                        </div>
                    </div>
                )}
                {tab==="settings" && (
                    <div className={"p-10 items-center"}>
                        <form className="w-full max-w-sm md:w-80" onSubmit={handleSubmit}>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-mode">
                                        Mode
                                    </label>
                                </div>
                                <div className="md:w-2/3 inline-block relative">
                                    <select value={method} onChange={(e) => {setMethod(e.target.value)}}
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
                            { memes && method==="selected" && (
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                            Meme
                                        </label>
                                    </div>
                                    <div className="md:w-2/3 inline-block relative">
                                        <select onChange={(e) => {setSelectedMeme(e.target.selectedIndex+1)}} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                            {
                                                memes.map((element: Meme) => {
                                                    return (<option key={element.id} value={element.id}>{element.name}</option>);
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
                            { method==="custom" && (
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                            Meme
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input onChange={(e) => {setCustomUrl(e.target.value)}} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-url" type="text" placeholder="Enter URL"/>
                                        {/*TODO: add regEx [https?:\/\/(www\.)?] to check url*/}
                                        {/*{<p>Please include http/https</p>}*/}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-center">
                                <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Save
                                </button>
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