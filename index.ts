import * as dotenv from 'dotenv';
dotenv.config();

import app = require('./server/app');
import http from 'http';


const server = http.createServer(app)

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});