import * as dotenv from 'dotenv';

dotenv.config();

export default {
  // FIXME auth time expires
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '30d',
  },
};
