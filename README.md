# uTask-Trainee-Back


CREATE TABLE "users" ( 
    "userId" SERIAL PRIMARY KEY, 
    "name" TEXT, 
    "email" TEXT, 
    "password" TEXT 
);

CREATE TABLE "session" ( 
    "sessionId" SERIAL PRIMARY KEY, 
    "token" TEXT NOT NULL, 
    "userId" INT NOT NULL, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY ("userId") REFERENCES "users"("userId") 
);

CREATE TABLE tasks (
    	id SERIAL PRIMARY KEY,
	title TEXT,
	description TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
