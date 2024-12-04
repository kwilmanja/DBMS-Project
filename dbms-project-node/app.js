import express from 'express';
import cors from 'cors';
import session from "express-session";
import UserController from "./user-controller.js";
import StoryController from './story-controller.js';



const app = express();

app.use(
    session({secret: "any string", resave: false, saveUninitialized: true,
            cookie: {secure: false}}));
app.use(
    cors({credentials: true, origin: "http://localhost:3000",}));
app.use(express.json());

UserController(app);
StoryController(app);

app.listen(4000);