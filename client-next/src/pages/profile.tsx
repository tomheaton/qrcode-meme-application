import type {NextPage} from "next";
import Head from "next/head";
import {useRouter} from "next/router";
import {useMemes, useUser} from "@lib/hooks";
import {ClipLoader} from "react-spinners";
import React, {SyntheticEvent, useState} from "react";
import {toast} from "react-hot-toast";
import QRCode from "react-qr-code";
import {Meme, MemeMethod} from "@prisma/client";

const Profile: NextPage = () => {

    const selectedStyle = "border-l border-t border-r rounded-t bg-white inline-block py-2 px-4 text-blue-500 font-semibold";
    const unselectedStyle = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold";

    const router = useRouter();

    const { data: userData, error: userError, mutate: userMutate } = useUser();
    const { data: memesData, error: memesError, mutate: memesMutate } = useMemes();

    const [tab, setTab] = useState<string>("qrcode");
    const [method, setMethod] = useState<MemeMethod>();
    const [selectedMeme, setSelectedMeme] = useState<number>(1);
    const [customUrl, setCustomUrl] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    if (userError || memesError) {
        return (
            <div className={"flex items-center justify-center flex-col"}>
                <h1>
                    error
                </h1>
            </div>
        );
    }

    if (!userData || !memesData) {
        return (
            <div className={"flex items-center justify-center flex-col"}>
                <ClipLoader />
            </div>
        );
    }

    if (!userData.user) {
        router.push("/login");
        return (
            <div className={"flex items-center justify-center flex-col"}>
                <h1>
                    no user
                </h1>
            </div>
        );
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await fetch(`/api/users/${userData?.user.username}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method, selectedMeme, customUrl })
            });
        } catch (error) {
            console.log("error:", error)
            throw error;
        }
    }

    const handleDeleteAccount = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const json = await response.json();

            if (json.success) {
                toast.success(json.message);
                setIsSubmitting(false);
                await router.push("/")
                return;
            }

            toast.error(json.message);
            setIsSubmitting(false);
        } catch (e) {
            toast.error("try catch error")
            setIsSubmitting(false);
        }
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

    const user = userData.user;
    const memes = memesData.memes;

    return (
        <div className={"flex items-center justify-center flex-col"}>
            <Head>
                <title>Profile | Flexo</title>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <h1 className={"font-bold text-5xl"}>
                Profile
            </h1>

            <br/>

            <ul className={"flex border-b"}>
                <li className={`mr-1 ${tab==="qrcode" && "-mb-px"}`}>
                    <button onClick={() => {setTab("qrcode")}} className={tab === "qrcode" ? selectedStyle : unselectedStyle}>
                        QR Code
                    </button>
                </li>
                <li className={`mr-1 ${tab==="settings" && "-mb-px"}`}>
                    <button onClick={() => {setTab("settings")}} className={tab === "settings" ? selectedStyle : unselectedStyle}>
                        Settings
                    </button>
                </li>
                <li className={`mr-1 ${tab==="other" && "-mb-px"}`}>
                    <button onClick={() => {setTab("other")}} className={tab === "other" ? selectedStyle : unselectedStyle}>
                        Other
                    </button>
                </li>
            </ul>

            <div>
                { tab === "qrcode" && (
                    <div className={"p-10"}>
                        <QRCode id={"QRCode"} value={`https://qrcode.tomheaton.dev/api/qrcode/${user.username}`} />
                        <div className={"flex items-center justify-center p-4"}>
                            <button onClick={handleDownload} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                                Download
                            </button>
                        </div>
                    </div>
                )}
                { tab === "settings" && (
                    <div className={"p-10 items-center"}>
                        <form className={"w-full max-w-sm md:w-80"} onSubmit={handleSubmit}>
                            <div className={"md:flex md:items-center mb-6"}>
                                <div className={"md:w-1/3"}>
                                    <label className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"} htmlFor={"inline-mode"}>
                                        Mode
                                    </label>
                                </div>
                                <div className={"md:w-2/3 inline-block relative"}>
                                    <select value={method}
                                            onChange={(e) => {setMethod((e.target.value as keyof typeof MemeMethod))}}
                                            className={"block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"}
                                    >
                                        {(Object.keys(MemeMethod) as Array<keyof typeof MemeMethod>).map((memeMethod: MemeMethod, index: number) => {
                                            return (
                                                <option value={memeMethod} key={index} id={memeMethod} style={{textTransform: "capitalize"}}>
                                                    {memeMethod.toLowerCase()}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div className={"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"}>
                                        <svg className={"fill-current h-4 w-4"} xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 20 20"}>
                                            <path d={"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            { memes.length > 0 && method === MemeMethod.SELECTED && (
                                <div className={"md:flex md:items-center mb-6"}>
                                    <div className={"md:w-1/3"}>
                                        <label htmlFor={"meme-selector"} className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                                            Meme
                                        </label>
                                    </div>
                                    <div className={"md:w-2/3 inline-block relative"}>
                                        <p>
                                            Selected Meme: {selectedMeme}
                                        </p>
                                        <select id={"meme-selector"}
                                                onChange={(e) => {setSelectedMeme(e.target.selectedIndex+1)}}
                                                className={"block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"}
                                        >
                                            { user.memes.map((element: Meme) => {
                                                return (
                                                    <option key={element.id} value={element.id}>{element.name} - {element.id}</option>
                                                );
                                            })}
                                        </select>
                                        <div className={"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"}>
                                            <svg className={"fill-current h-4 w-4"} xmlns={"http://www.w3.org/2000/svg"} viewBox={"0 0 20 20"}>
                                                <path d={"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"} />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            { memes.length === 0 && method === MemeMethod.SELECTED && (
                                <p className={"m-3"}>
                                    no memes found
                                </p>
                            )}
                            { method === MemeMethod.CUSTOM && (
                                <div className={"md:flex md:items-center mb-6"}>
                                    <div className={"md:w-1/3"}>
                                        <label htmlFor={"customUrl"} className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                                            Meme
                                        </label>
                                    </div>
                                    <div className={"md:w-2/3"}>
                                        <input onChange={(e) => {setCustomUrl(e.target.value)}}
                                               id={"customUrl"}
                                               name={"customUrl"}
                                               type={"url"}
                                               placeholder={"enter url"}
                                               className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={"flex items-center justify-center"}>
                                <button type={"submit"} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                { tab === "other" && (
                    <div className={"p-10"}>
                        <h3 className={"font-bold text-2xl"}>
                            other
                        </h3>
                    </div>
                )}
            </div>

            <pre>
                {JSON.stringify(user, null, 4)}
            </pre>

            <br/>

            <pre>
                {JSON.stringify(memes, null, 4)}
            </pre>

            <br/>

            <div className={"flex items-center justify-center"}>
                <button onClick={handleDeleteAccount} className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}>
                    { isSubmitting ? (<ClipLoader color={"white"} size={20} />) : ("Delete Account") }
                </button>
            </div>
        </div>
    );
}

export default Profile;
