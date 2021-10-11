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

        const char = await prisma.guildList.create({
            data: {
                name: req.body.name,
                serverId: req.body.serverId,
                factionId: req.body.factionId,
                ownerId: req.body.charId
            },
        });
    } catch (e) {
        console.error(e)
        if (e.meta?.target?.indexOf('name') >= 0 ) {
            res.status(500).json({
                success: false,
                message: "Alredy exists a guild with the same name on that server"
            });
        } else if (e.meta?.target?.indexOf('ownerId') >= 0 ) {
            res.status(500).json({
                success: false,
                message: "Alredy exists a guild on this server for your char"
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
        message: "Guild '" + req.body.name + "' created with success"
    })
}

export default withProtect(handler)