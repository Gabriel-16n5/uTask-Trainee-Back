import { Router } from "express";
import { signUp, getUsers, deleteUsers, updateUsers, signIn } from "../controllers/users-controller";
import { loginSchema, updateUserSchema, userSchema } from "../schemas/users-shema";
import {validateSchema} from "@/middlewares/userValidateSchema"

const usersRouter = Router();

usersRouter.get("/users", getUsers);
usersRouter.post("/signup", validateSchema(userSchema), signUp);
usersRouter.post("/signin",validateSchema(loginSchema), signIn);
usersRouter.put("/users", validateSchema(updateUserSchema), updateUsers);
usersRouter.delete("/users/:id", deleteUsers);


export default usersRouter;