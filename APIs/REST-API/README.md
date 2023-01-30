# LAN Backend

## How to start the back-end

Install the dependencies

```bash
npm i
```

How to connect to a database: https://sequelize.org/docs/v6/other-topics/migrations/

Once the config file is created in the config folder, run the migrate command.

```bash
npx sequelize-cli db:migrate
```

Start the application

```bash
npm start
```

To get the authentication service working, you must create a .env file in the current directory.  
Sample env file

```bash
NODE_ENV=production
PORT=4000

JWT_SECRET=hello_world
JWT_EXPIRES_IN=3600000
```
