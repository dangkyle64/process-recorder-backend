import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

class Database {

    #sequelize; 

    constructor() {
        if (!this.#sequelize) {
            this.#sequelize = new Sequelize(process.env.DB_URL, {
                dialect: 'postgres',
                logging: false,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: true, 
                    },
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000, 
                    idle: 10000
                },
            });
        };
    };

    getSequelize() {
        return this.#sequelize;
    };

    setSequelize(sequelizeInstance) {
        this.#sequelize = sequelizeInstance;
    };

    async authenticate() {
        try {
            await this.#sequelize.authenticate();
            console.log('Postgres connection established');
        } catch(error) {
            console.error('Unable to connect to the Postgres database: ', error);
        };
    };
};

export default Database;