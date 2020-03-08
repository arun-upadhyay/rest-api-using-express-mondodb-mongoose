# rest-api-using-express-mondodb-mongoose
This apps (SPA) is hosted on Heroku. Frontend (React Redux) : https://arun-api.herokuapp.com/ Backend (Express, MongoDB): https://arun-express-api.herokuapp.com/

Linux environment
    install demon process manager. pm2 (https://www.npmjs.com/package/pm2)
    
Hosted Environment:
 Heroku: https://arun-express-api.herokuapp.com/
 Steps Followed:
    Make sure that Procfile and package.json is updated for deploying purpose.
    Procfile
    web:node index.js
    package.json
    "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js"
      }
    Follow guide from this link
    https://devcenter.heroku.com/articles/deploying-nodejs
    