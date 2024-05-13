import connection from "../database/database";
import { Auth } from "../protocols/authentication-procotol";
import User from "../protocols/user-protocol";


export async function createSession(data: Auth) {
    const result = await connection.query(`
    INSERT INTO session ("token", "userId")
    VALUES ($1, $2)
`, [data.token, data.userId ]);
    return result
}

export async function findSessionByToken(token: string) {
  return await connection.query(`
  SELECT * FROM session WHERE token = $1
  `, [token]);
}

export async function updateSession(token: string, email: string) {
    const verifyEmail = await connection.query(`
    SELECT * FROM users WHERE email = $1
    `, [email]);
    const verifyUser = await connection.query(`
    SELECT * FROM session WHERE userId = $1
    `, [verifyEmail[0].userId]);

    return  await connection.query(`
    UPDATE session
        SET "token" = $1
            WHERE "userId" = $2
    ;`, [token, verifyUser[0].userId]) 
  }

  export const authenticationRepository = {
    createSession,
    findSessionByToken,
    updateSession
  };