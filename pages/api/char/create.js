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

        const char = await prisma.charList.create({
            data: {
                name: req.body.name,
                userId: req.body.userId,
                level: req.body.level,
                weaponP: req.body.weaponP,
                weaponS: req.body.weaponS,
                factionId: req.body.factionId,
                serverId: req.body.serverId,
                guildId: req.body.guildId
            },
        });
    } catch (e) {
        console.error(e)
        if (e.meta?.target?.indexOf('serverId') >= 0 ) {
            res.status(500).json({
                success: false,
                message: "Alredy exists a char with the same name on that server"
            });
        } else if (e.meta?.target?.indexOf('userId') >= 0 ) {
            res.status(500).json({
                success: false,
                message: "Alredy exists a char on this server for your user"
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: "Internal Server Error"
            });
        }
    } finally {
        await prisma.$disconnect()
    }
    return res.json({
        message: "Char " + req.body.name + " created with success"
    })
}

export default withProtect(handler)