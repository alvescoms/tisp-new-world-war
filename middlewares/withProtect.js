import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
// const JWT_SECRET = 'asidasd7ug123ih';
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient({ log: ["query"] });

const withProtect = (handler) => {
    return async (req, res) => {

        let token = req.headers.authorization.substring(7);

        if (!token) {

            return res.status(401).json({
                success: false,
                message: 'Please login.'
                
            });
        };

        try {

            const decoded = await jwt.verify(
                token,
                JWT_SECRET

            );

            const currentUser = await prisma.users.findUnique({
                
                where: {
                    email : decoded.username

                }
            });

            if (!currentUser) {

                return res.status(401).json({
                    success: false,
                    message: 'Token\'s user dosent exist anymore'

                });
            }

            return handler(req, res);

        } catch (e) {

            return res.status(401).json({
                success: false,
                message: 'Please log in'

            });
        } finally {
            await prisma.$disconnect()
        }
    };
};

export default withProtect;