# Secure rest api

1. Clone this repository.
2. run NPM init to install the dependencies. 
3. You can run this api with MongoDB or Mysql. 
### MongoDB

4. Define your database credentials at: app/config/config.js 
5. If you leave username blank it will connect to default localhost.
6. Start the app with the command `NODE_ENV=mongodb npm start`

### Mysql

7. Define your database credentials at: app/config/config.js
8. If the database is not already created run `npm run mysql`
9. Start the app with the command `NODE_ENV=mysql npm start`

