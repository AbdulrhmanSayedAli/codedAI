import { Sequelize } from 'sequelize';
import config from '../../config/config.js';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const env = process.env.NODE_ENV || 'development';
console.log(config[env]);

const sequelize = new Sequelize(config[env]);

export default sequelize;
