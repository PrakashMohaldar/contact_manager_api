const express = require('express');
const dotenv = require('dotenv').config();
const contactRoutes = require('./routes/contactRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbconnection')


connectDB();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});