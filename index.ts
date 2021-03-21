import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app = require('./server/app');

const server = http.createServer(app)

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});