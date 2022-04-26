import {genSaltSync, hashSync} from "bcryptjs";
import {PrismaClient} from "@prisma/client";

console.log("Seeding QRCode Application...");

const prisma = new PrismaClient();

const salt = genSaltSync(10);
const hashedPassword = hashSync(`${process.env.BASE_PASSWORD}`, salt);

const memes = [
    {
        name: "shrek-allstar",
        link: "https://youtu.be/HLQ1cK9Edhc?t=16"
    },
    {
        name: "chipotle",
        link: "https://youtu.be/8rDNZ5Ebwsc?t=7"
    },
    {
        name: "chickens",
        link: "https://youtu.be/F-X4SLhorvw?t=26"
    },
    {
        name: "dreams-stutter",
        link: "https://youtu.be/G7RgN9ijwE4"
    },
    {
        name: "refrigerators",
        link: "https://youtu.be/TiC8pig6PGE?t=10"
    },
    {
        name: "rickroll",
        link: "https://youtu.be/dQw4w9WgXcQ"
    },
    {
        name: "six-consoles",
        link: "https://youtu.be/RuERcyUwpZk?t=10"
    }
]

const main = async () => {
    await prisma.$connect();
    console.log("Connected to database");

    console.log("Adding 'tomheaton' user");
    const newUser = await prisma.user.create({
        data: {
            username: "tomheaton",
            password: hashedPassword
        }
    });
    console.log(`user: ${newUser.username}`);

    console.log("Adding Memes");
    for (const meme of memes) {
        const result = await prisma.meme.create({
            data: {
                ...meme,
                author: {
                    connect: {
                        id: newUser.id
                    }
                }
            }
        });
        console.log(JSON.stringify(result, null, 4));
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });