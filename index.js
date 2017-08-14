require("dotenv").config();
const server = require('./server/app.js');

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
