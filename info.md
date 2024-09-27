* npm install nodemon --save-dev

  installs nodemon as a devdependancy so that it will be run only in development mode. Changing "test" to "start" and binding it with "nodemon" in the package.json folder and writing npm install in the command line continously runs the script.js file and updates the changes in the terminal.

* npm init

  The npm init command is used to create a Node. js project. The npm init command will create a package where the project files will be stored. All the modules you download will be stored in the package.

* npm insall bycrypt-nodejs

  _DEPRICATED!_ You can use the bcrypt library to hash and verify passwords in Node. js. Hashing passwords minimizes the chances of cybercriminals using them to access sensitive data or services. Salting your hashed passwords makes them even more secure.

* npm install cors

```
const cors = require("cors");
app.use(cors());
```
  
  CORS is a node. js package for providing a Connect/Express middleware that can be used to enable CORS with various options; to allow cross origin resource sharing

* npm install express

  Express is a minimal and flexible Node. js web application framework that provides a robust set of features for web and mobile applications. It is an open source framework developed and maintained by the Node. js Foundation. Used to create this server

* npm install knex
  
    Knex is a SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.
  
* npm install pg
  
    pg is a non-blocking PostgreSQL client for Node. js. It is written in JavaScript and does not require compiling. It is 100% pure JavaScript and has no external dependencies. It is tested with PostgreSQL 8. 0 and later. It supports PostgreSQL 7. 4 and later with some limitations; needed with knex
