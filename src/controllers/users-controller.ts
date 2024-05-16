import express, {Request, Response} from "express"
import User from "../protocols/user-protocol";
import { usersService } from "@/services/users-service";
import httpStatus from "http-status";
import { authenticationService } from "../services/authentication-service";
import { Description } from "joi";

type UserId = Pick<User, 'userId'>;
type SignUp = Omit<User, 'userId'>;
type SignIn = Pick<User, 'email' | 'password'>;
type Task = {
    title: string;
    description: string;
};

export async function getUsers (req: Request, res: Response) {
    const users = await usersService.getUsers();
    return res.status(httpStatus.OK).send(users);
}

export async function  signUp(req: Request, res: Response) {
    const body = req.body as SignUp
        const result = await usersService.signUp(body);
        return res.sendStatus(httpStatus.CREATED)
}

export async function  signIn(req: Request, res: Response) {
    const{email, password} = req.body as SignIn
        const result = await authenticationService.signIn(email, password);
        return res.send(result).status(httpStatus.OK);
}

export async function deleteUsers(req: Request, res: Response) {
    const { id } = req.params;
    const userId: UserId = { userId: parseInt(id, 10) };
    const result = usersService.deleteUser(userId[0]);
    return res.sendStatus(httpStatus.OK);
}

export async function updateUsers (req: Request, res: Response) {
  const user:User = req.body;
  const result = await usersService.updateUser(user);
  return res.sendStatus(httpStatus.OK);
}

export async function getHome (req: Request, res: Response) {
    const tasks = await usersService.getTasks();
    return res.status(httpStatus.OK).send(tasks);
}

export async function createTask (req: Request, res: Response) {
    const body = req.body as Task
        const result = await usersService.createTask(body);
        return res.sendStatus(httpStatus.CREATED)
}