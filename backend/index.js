const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {connectDB}  = require('./config/dbconfig');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

//If using /api/chat then remove it from the route
app.use('/api', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/exchange', exchangeRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB(process.env.MONGO_URL);
});
