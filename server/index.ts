import dotenv from 'dotenv';
import http from 'http';

dotenv.config();
import app = require('./src/app');

const server = http.createServer(app);

const PORT = process.env.PORT as string || 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`) ;
});
