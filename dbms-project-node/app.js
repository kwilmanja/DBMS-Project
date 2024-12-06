import express from 'express';
import cors from 'cors';
import session from "express-session";
import UserController from "./user-controller.js";
import StoryController from './story-controller.js';
import CommentController from './comment-controller.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
    session({secret: "any string", resave: false, saveUninitialized: true,
            cookie: {secure: false}}));
app.use(
    cors({credentials: true, origin: "http://localhost:3000",}));
app.use(express.json());

UserController(app);
StoryController(app);
CommentController(app);

app.listen(process.env.PORT || 4000);