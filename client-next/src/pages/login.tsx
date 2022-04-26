import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState} from "react";
import axios from "axios";
import Head from "next/head";

const Login: NextPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("register user", username);

        const result = await axios.post(
            "/api/auth/register",
            {username: username}
        );
        console.log("result: ", result)

        await router.push(`/users/${username}`)
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-2 pt-10">
            <Head>
                <title>Register | QR Code Application</title>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <h1 className={"font-bold text-5xl"}>Register</h1>
            <br/>

            <form className="w-full max-w-sm md:w-80" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Username
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input onChange={(e) => {setUsername(e.target.value)}} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-url" type="text" placeholder="enter username"/>
                    </div>
                </div>
                <br/>
                <div className="flex items-center justify-center">
                    <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
