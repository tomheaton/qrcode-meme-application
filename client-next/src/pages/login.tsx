import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {SyntheticEvent, useState} from "react";
import Head from "next/head";
import {toast} from "react-hot-toast";
import {ClipLoader} from "react-spinners";

const Login: NextPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const json = await response.json();

            if (json.success) {
                toast.success(json.message);
                setIsSubmitting(false);
                await router.push("/profile")
                return;
            }

            toast.error(json.message);
            setIsSubmitting(false);
        } catch (e) {
            toast.error("try catch error")
            setIsSubmitting(false);
        }
    }

    return (
        <div className={"flex flex-col items-center min-h-screen py-2 pt-10"}>
            <Head>
                <title>Login | QR Code Application</title>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <h1 className={"font-bold text-5xl"}>
                Login
            </h1>

            <br/>

            <form onSubmit={handleSubmit} id={"login-form"} className={"w-full max-w-sm md:w-80"}>
                <div className={"md:flex md:items-center mb-6"}>
                    <div className={"md:w-1/3"}>
                        <label htmlFor={"username"} className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                            Username
                        </label>
                    </div>
                    <div className={"md:w-2/3"}>
                        <input onChange={(e) => {setUsername(e.target.value)}}
                               id={"username"}
                               name={"username"}
                               type={"text"}
                               placeholder={"enter username"}
                               required={true}
                               min={1}
                               max={255}
                               className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"}
                        />
                    </div>
                </div>
                <div className={"md:flex md:items-center mb-6"}>
                    <div className={"md:w-1/3"}>
                        <label htmlFor={"password"} className={"block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"}>
                            Password
                        </label>
                    </div>
                    <div className={"md:w-2/3"}>
                        <input onChange={(e) => {setPassword(e.target.value)}}
                               id={"password"}
                               name={"password"}
                               type={"password"}
                               placeholder={"••••••••••••••"}
                               required={true}
                               min={12}
                               max={255}
                               className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"}
                        />
                    </div>
                </div>

                <br/>

                <div className={"flex items-center justify-center"}>
                    <button type={"submit"} form={"login-form"} className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                        { isSubmitting ? (<ClipLoader color={"white"} size={20} />) : ("Login") }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
