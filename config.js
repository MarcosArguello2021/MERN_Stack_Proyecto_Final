import {join, resolve} from 'path';
import { config } from 'dotenv';
config({
    path: resolve(join('../'), process.env.NODE_ENV + '.env')
});

const { MONGO_USER,
    MONGO_PASS,
    MONGO_CLUSTER,
    EXPIRES_TOKEN,
    PORT,
    SECRET_KEY,
    TEST_MAIL,
    TEST_MAIL_PASS
} = process.env;

export default {
    mongodb: {
        uri: `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}${MONGO_CLUSTER}`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        expireToken: EXPIRES_TOKEN,
        secretKey: SECRET_KEY,
    },
    port: {
        puerto :PORT,
    },
    nodemailer: {
        mail: TEST_MAIL,
        password: TEST_MAIL_PASS
    }
};
