import {NextPage} from "next";
import Head from "next/head";
import {useRouter} from "next/router";
import {useUser} from "@lib/hooks";
import {ClipLoader} from "react-spinners";
import React, {SyntheticEvent, useState} from "react";
import {toast} from "react-hot-toast";

const Profile: NextPage = () => {

    const router = useRouter();

    const { data: userData, error: userError, mutate: userMutate } = useUser();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    if (userError) {
        return (
            <div className={"flex items-center justify-center flex-col"}>
                <h1>
                    error
                </h1>
            </div>
        );
    }

    if (!userData) {
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

    const user = userData.user;

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

            <pre>
                {JSON.stringify(user, null, 4)}
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
