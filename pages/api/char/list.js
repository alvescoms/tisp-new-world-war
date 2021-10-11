import { PrismaClient } from "@prisma/client";
import withProtect from "../../../middlewares/withProtect"

const handler = async (req, res) => { 

    if (req.method !== "POST") {
        return res.status(405).json({ 
            success: false,
            message: "Method Not Allowed"
        });
    }

    const prisma = new PrismaClient({ log: ["query"] });
    
    try {
        if (req?.body?.userId) {
            const chars = await prisma.charList.findMany({
                where: {
                    userId: req.body.userId
                },
            });
            return res.json({
                success: true,
                message: chars
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "UserId Not found on Request"
            })
        }
    } catch (e) {
        console.error(e)
        return res.json({
            success: false,
            message: "Internal Server Error"
        })

    } finally {
        await prisma.$disconnect()
    }
    
}

export default withProtect(handler)