import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from "next/router";
import {FormEvent, useState} from "react";

const Index: NextPage = () => {

    const router = useRouter();
    const [username, setUsername] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await router.push(`/users/${username}`);
    }

    return (
        <div className={"flex flex-col items-center justify-center min-h-screen py-2"}>
            <Head>
                <title>QR Code Application</title>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <main className={"flex flex-col items-center justify-center w-full flex-1 px-20 text-center"}>
                <h1 className={"text-6xl font-bold"}>
                    Welcome to the QR Code Application
                </h1>
                <br/>
                <p className={"mt-3 text-2xl"}>
                    Get started by entering your{" "}
                    <code className={"p-3 font-mono text-lg bg-gray-100 rounded-md"}>
                        username
                    </code>
                    {" "}below
                    <br/>👇{/*⤵*/}️️
                </p>
                <br/>
                <div onSubmit={handleSubmit} className={"flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"}>
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"} htmlFor={"inline-username"}>
                                    Username
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input onChange={(e) => {setUsername(e.target.value)}}
                                       className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"}
                                       id={"inline-username"}
                                       type={"text"}
                                       placeholder={"enter username"}
                                />
                            </div>
                        </div>
                        <div className={"flex items-center justify-center"}>
                            <button disabled={username.length === 0}
                                    type={"submit"}
                                    className={"shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}
                            >
                                Discover
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <footer className={"flex items-center justify-center w-full h-24 border-t"}>
                <a className={"flex items-center justify-center"} href={"https://tomheaton.dev/"} target={"_blank"} rel={"noopener noreferrer"}>
                    Developed by Tom Heaton
                </a>
            </footer>
        </div>
    );
}

export default Index;
