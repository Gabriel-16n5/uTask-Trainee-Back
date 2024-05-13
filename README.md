# uTask-Trainee-Back

 userId | name | email | password 
--------+------+-------+----------

CREATE TABLE "users" ( 
    "userId" SERIAL PRIMARY KEY, 
    "name" TEXT, 
    "email" TEXT, 
    "password" TEXT );

 sessionId | token | userId | createdat | updatedat 
-----------+-------+--------+-----------+-----------

CREATE TABLE "session" ( 
    "sessionId" SERIAL PRIMARY KEY, 
    "token" TEXT NOT NULL, 
    "userId" INT NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY ("userId") REFERENCES "users"("userId") );