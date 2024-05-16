import connection from "../database/database";
import User from "../protocols/user-protocol";

type UserId = Pick<User, 'userId'>;
type SignUp = Omit<User, 'userId'>;
type SignIn = Pick<User, 'email' | 'password'>;
type Task = {
  title: string;
  description: string;
};

export async function signUp(user: SignUp) {
  return await connection.query<User>(`
  INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
`, [user.name, user.email, user.password]);
}

export async function signIn(user: SignIn) {
  const result = await connection.query<SignIn>(`
  SELECT * FROM users WHERE email = $1 AND password = $2
  `, [user.email, user.password]);
  const listUsers = result.rows
  return listUsers;
}

export async function getUsers() {
    const result = await connection.query<User>(`SELECT * FROM users`);
    const listUsers = result.rows
    return listUsers;
  }

  export async function getUserByEmail(email:string) {
    const result = await connection.query<User>(`SELECT * FROM users 
    WHERE email = $1`, [email]);
    return result.rows;
  }

export async function deleteUser(userId:UserId) {
    return await connection.query<UserId>(`
    DELETE FROM users WHERE "userId" = $1
`, [userId]);
  }  

  export async function updateUser(user:User) {
    return  await connection.query(`
    UPDATE users
        SET "name" = $2, email = $3, password = $4
            WHERE "userId" = $1
    ;`, [user.userId, user.name, user.email, user.password])
  }

  export async function createTask(task: Task) {
    return await connection.query<Task>(`
    INSERT INTO tasks (title, description)
        VALUES ($1, $2)
  `, [task.title, task.description]);
  }

  export async function getTasks() {
    const result = await connection.query<User>(`SELECT * FROM tasks`);
    const listTasks = result.rows
    return listTasks;
  }

  export const usersRepository = {
    getUsers,
    signUp,
    deleteUser,
    updateUser,
    signIn,
    getUserByEmail,
    createTask,
    getTasks
  }