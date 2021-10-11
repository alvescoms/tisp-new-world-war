import { PrismaClient } from "@prisma/client";
import hash  from "hash.js";
import bcrypt from "bcrypt";
import withProtect from "../../../middlewares/withProtect"

const handler = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({ Response: "Method Not Allowed"});
    }

    const prisma = new PrismaClient({ log: ["query"] });

    try {
        const users = await prisma.users.create({
            data: {
                email: req.body.email.toLowerCase(),
                name: req.body.name.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                statusId: 1,
                active: false,
                hashActive: hash.sha512().update(req.body.email+req.body.name).digest('hex')
            },
        });
    } catch (e) {
        console.error(e);
        if (e.meta?.target){
            return res.status(500).json({ 
                success: false, 
                message: "The field " + e.meta.target +
                " alredy exists with the value " + req.body[e.meta.target]
            });
        } else {
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error"
            });
        };
    } finally {
        await prisma.$disconnect()
    }
    return res.status(200).json({ 
        success: true,
        message: "User created"
    });
}

export default handler;