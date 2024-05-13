import User from "../protocols/user-protocol";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';
import { authenticationRepository } from '../repositories/authentication-repository';
import { usersRepository } from '../repositories/users-repository';
import dotenv from "dotenv"
dotenv.config()


async function signIn(email:string, password:string) {
  const user:any = await getUserOrFail(email);
  await validatePasswordOrFail(password, user[0].password);
  const token = await createSession(user[0].userId);
  return {
    user: exclude(user[0], 'password'),
    token,
  };
}

async function getUserOrFail(email: string) {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) throw unauthorizedError("access denied");

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await authenticationRepository.createSession({ token, userId });
  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw unauthorizedError("access denied");
}


export const authenticationService = {
  signIn,
};


function exclude<T extends Record<string, any>, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const { [key]: excluded, ...rest } = obj;
  return rest;
}