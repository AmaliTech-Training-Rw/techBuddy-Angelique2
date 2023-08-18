import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/auth.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
const connectToMongoDb = () => {
     mongoose.connect(process.env.MONGOPASS)
         .then(() => {
             console.log("database connected succesfully");
         }).catch((err) => {
             console.log("failed to connect to the database", err)
         })
 }
 const port = 5500;
 app.listen(port, () => {
     console.log('server is running on port' + port)
     connectToMongoDb();
 });
