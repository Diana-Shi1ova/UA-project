const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
//const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false})); // comprobar!

app.use('/api/assets', require('./routes/assetRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/formats', require('./routes/formatRoutes'));
app.use('/api/histories', require('./routes/historyRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(cors({
  origin: 'https://ua-project.vercel.app/',
  credentials: true
}));

//app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));