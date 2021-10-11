import { PrismaClient } from "@prisma/client";
import hash  from "hash.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import atob from "atob";
// const JWT_SECRET = 'asidasd7ug123ih';
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
    
    if (req.method !== "POST") {
        return res.status(405).json({ 
            success: false,
            message: "Method Not Allowed"
        });
    }

    if (!req.headers.authorization) {
        return res.status(404).json({
            success: false,
            message: "Error"
        });
    }

    const prisma = new PrismaClient({ log: ["query"] });

    try {
        const decoded = atob(req.headers.authorization.split(' ')[1])
        const splitter = decoded.indexOf(":")
        const email = decoded.substring(0, splitter)
        const password = decoded.substring(splitter+1)

        const user = await prisma.users.findFirst({
            where: {
                email: email.toLowerCase()
            }
        })

        const verified = await bcrypt.compareSync(password, (user?.password) ? user.password : '');

        if (verified) {

            await prisma.users.update({
                where: { id: user.id },
                data: { lastLogin: new Date() }
            })

            const token = jwt.sign(
                {
                    username: user.email,
                    password: user.password
                },
                JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            )
            res.json({
                success: true,
                token,
                user
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Email or password incorrect"
            })
        }
    } catch (e) {
        console.error(e);
        
    } finally {
        await prisma.$disconnect()
    }
}

export default handler;