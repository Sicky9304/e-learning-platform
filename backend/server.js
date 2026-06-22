// start the server
const app = require('./app');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

// load the .env variables
dotenv.config();
// connect to Database
connectdb();

//listening Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
