import app = require('./server/app');
import http from 'http';

const server = http.createServer(app)

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});