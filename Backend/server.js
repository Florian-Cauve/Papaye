const express = require('express');
//on récupère la configuration de notre connexion à la database
const connectDB = require('./config/db')
require('dotenv').config({ path: './config/.env' })
const userRoutes = require('./routes/api/users')
const cors = require('cors');
const app = express();

connectDB();
const port = process.env.PORT || 8082;
app.use(cors());
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));