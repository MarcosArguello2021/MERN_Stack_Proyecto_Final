import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import config from "../../config.js";

const mailAdmin = {
    user: config.nodemailer.mail,
    pass: config.nodemailer.password
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: mailAdmin,
});

export const enviarMail = async (asunto, datos) => {
    try {
        const info = await transporter.sendMail({
            from: 'servidor Node.js',
            to: mailAdmin.user,
            subject: asunto,
            html: datos,
        })
        logger.info(info)
    }
    catch (error) {
        logger.error(error)
    }
};