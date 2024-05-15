import express, { Request, Response, json } from "express";
import 'express-async-errors';
import httpStatus from "http-status";
import usersRouter from "./routers/users-router";
import jwt = require('jsonwebtoken');
import { handleApplicationErrors } from './middlewares/error-handling-middleware';
import cors from 'cors';

const app = express();
app.use(json());

app.use(cors());

app.use(usersRouter);
app.use(handleApplicationErrors);

app.get("/health", (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("Online!!!");
})

const port: Number = parseInt(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server online e rodando na porta ${port}`));
