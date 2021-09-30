import {PrismaClient} from "@prisma/client/scripts/default-index";

const prisma = new PrismaClient();

const generate = async () => {
    const newUser = await prisma.meme.create({
        data: {
            name: "shrek-allstar",
            link: "https://youtu.be/HLQ1cK9Edhc?t=16"
        },
    })
}

generate();
