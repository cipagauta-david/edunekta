import * as Joi from 'joi';

export default () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change_me',
    // Support both JWT_EXPIRES and JWT_EXPIRES_IN
    expiresIn: process.env.JWT_EXPIRES || process.env.JWT_EXPIRES_IN || '1d',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    // Support both DB_USER and DB_USERNAME
    user: process.env.DB_USER || process.env.DB_USERNAME || 'root',
    pass: process.env.DB_PASSWORD || '',
    // Support both DB_NAME and DB_DATABASE
    name: process.env.DB_NAME || process.env.DB_DATABASE || 'edunekta',
  },
});

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  // Accept either key for expires
  JWT_EXPIRES: Joi.string().default('1d'),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  // Accept either key for username
  DB_USER: Joi.string().default('root'),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string().allow('').default(''),
  // Accept either key for database name
  DB_NAME: Joi.string().default('edunekta'),
  DB_DATABASE: Joi.string(),
});
