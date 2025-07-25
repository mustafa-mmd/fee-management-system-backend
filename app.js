const express = require('express');
const app = express();
const cors = require('cors');

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fee-management-system-frontend.vercel.app"
  ],
  credentials: true
}));



require('dotenv').config();
require("./libs/db");

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
