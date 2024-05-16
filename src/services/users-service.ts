import { usersRepository } from "../repositories/users-repository";
import User from "../protocols/user-protocol";
import { notFoundError, invalidError } from "../errors";
import bcrypt from 'bcrypt';

type UserId = Pick<User, 'userId'>;
type SignUp = Omit<User, 'userId'>;
type SignIn = Pick<User, 'email' | 'password'>;
type Task = {
    title: string;
    description: string;
};

export async function getUsers() {
    const usersList = await usersRepository.getUsers();
    if(!usersList||usersList.length===0) throw notFoundError("users not found");
    return usersList;
}

export async function signUp(user:SignUp) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const userCreated = await usersRepository.signUp({
        email: user.email,
        password: hashedPassword,
        name: user.name
    });
    if(!userCreated) throw invalidError("we can't create this user")
    return userCreated;
}

export async function signIn(user:SignIn) {
    const userLogin = await usersRepository.signIn(user);
    console.log(userLogin)
    if(!userLogin||userLogin.length===0) throw invalidError("we can't find this user")
    return userLogin;
}

export async function deleteUser(userId:UserId) {
    const userDeleted = await usersRepository.deleteUser(userId);
    if(!userDeleted) throw invalidError("we can't delete this user");
    return userDeleted;
}

export async function updateUser(user:User) {
    const userUpdated = await usersRepository.updateUser(user);
    if(!userUpdated) throw invalidError("we can't update this user");
    return userUpdated;
}

export async function createTask(task:Task) {
    const taskCreated = await usersRepository.createTask({
        title: task.title,
        description: task.description
    });
    if(!taskCreated) throw invalidError("we can't create this task")
    return taskCreated;
}

export const usersService = {
    getUsers,
    signUp,
    deleteUser,
    updateUser,
    signIn,
    createTask
}