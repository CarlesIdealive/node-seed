import 'dotenv/config';
import * as env from 'env-var'; //Validaciones y tipado estricto de las varibles de entorno

export const envs = {
    PRODUCTION: env.get('PRODUCTION').required().asBool(),
    PORT: env.get('PORT').required().asPortNumber(),
    BASE_URL: env.get('BASE_URL').required().asString(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    MONGO_DB_URL : env.get('MONGO_DB_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(), 
    MONGO_DB_USER: env.get('MONGO_DB_USER').required().asString(),
    MONGO_DB_PASSWORD: env.get('MONGO_DB_PASSWORD').required().asString(),
};
