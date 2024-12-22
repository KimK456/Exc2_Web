import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postsRoutes from "./routes/posts_routes";
import commentsRoutes from "./routes/comments_routes";

dotenv.config();
const app = express();
const port: string | undefined = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL as string);
const db = mongoose.connection;
db.on('error', (error) => { console.error.bind(console, 'connection error:' + error) });
db.once('open', () => console.log('connected to mongo'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", postsRoutes);
app.use("/comment", commentsRoutes);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});