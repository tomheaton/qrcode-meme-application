import {NextPage} from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";

const Information: NextPage = () => {

    return (
        <div className={"flex flex-col justify-center items-center min-h-screen py-2 pt-10"}>
            <Head>
                <title>Information | QR Code Application</title>
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <h1 className={"font-bold text-5xl"}>
                Information
            </h1>

            <br />

            <p>
                Print your QR code onto a t-shirt and share your memes with anyone!
            </p>

            <br/>

            <div className={"w-1/4"}>
                <Image src={"/tshirt.jpg"} alt={"QR Code T-Shirt"} width={2736} height={3648} layout={"responsive"} />
            </div>
        </div>
    );
}

export default Information;