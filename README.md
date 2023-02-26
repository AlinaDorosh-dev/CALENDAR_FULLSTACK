![Screenshot of Calendar App](https://github.com/AlinaDorosh-dev/CALENDAR_FULLSTACK/blob/0f5278687c1411764081fb13a1c294c2ec6b680a/frontend/public/images/Calendar.png)
# MY CALENDAR :calendar:

### MERN STACK PROJECT
<img src=  "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongoDB" 
     width="40" height="40"/><img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="express" width="40" height="40"/><img src="https://reactnative.dev/img/header_logo.svg" alt="react" width="40" height="40"/><img src= "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="nodeJS" width="40" height="40"/>
## Usage 

This application is a time management tool, which helps the user increase the productivity.
Includes following functionality:

-Create new user with email and password protected with bcrypt

-Each time user log in updates last login date and generate token 
through jsonwebtoken

-Create event clicking on calendar date

-Modify event time, date, title or delete it

-Update user email and password 

-Delete user


## Installation :building_construction:	
### Backend :construction_worker_woman:
In order to run the project you need to have `mongodb` installed and running. Then inside folder `backend/` run following command:

```bash
npm install
```
create `.env` file with following environment variables: TODO
```bash
DATABASE_URL=[your mongodb string and name of database (ex. mongodb://localhost:27017/calendar)]
NODE_ENV=development
TOKEN_SECRET=[your token secret (can be generated using node crypto module)]
REFRESH_TOKEN_SECRET=[your refresh token secret (can be generated using node crypto module)]
```

run the following command, and the server will be listening on the PORT `8001`:
```bash
npm run dev
```

### Frontend :woman_artist:
Inside folder `frontend/` run following commands:

```bash
npm install
```
```bash
npm start
```

### Styles :art: and layout :pencil:
Using CSS Modules Stylesheet. Every Component has it own `.module.css` file


### Main project structure :package:
```
📦backend
 ┣ 📂config
 ┃ ┗ 📜db.js
 ┣ 📂controllers
 ┃ ┣ 📜eventController.js
 ┃ ┗ 📜loginController.js
 ┣ 📂middleware
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┗ 📜tokenMidlware.js
 ┣ 📂models
 ┃ ┣ 📜eventModel.js
 ┃ ┗ 📜loginModel.js
 ┣ 📂routes
 ┃ ┣ 📜eventRoutes.js
 ┃ ┗ 📜loginRoutes.js
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
📦frontend
 ┣ 📂public
 ┃ ┣ 📂images
 ┃ ┃ ┗ 📜Calendar.png
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂calendar
 ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜AddForm.js
 ┃ ┃ ┃ ┃ ┣ 📜ModalForm.js
 ┃ ┃ ┃ ┃ ┣ 📜ModalForm.module.css
 ┃ ┃ ┃ ┃ ┗ 📜ModifyForm.js
 ┃ ┃ ┃ ┣ 📜Calendar.js
 ┃ ┃ ┃ ┣ 📜Calendar.module.css
 ┃ ┃ ┃ ┣ 📜CalendarCell.js
 ┃ ┃ ┃ ┣ 📜CalendarCell.module.css
 ┃ ┃ ┃ ┣ 📜CalendarEvent.js
 ┃ ┃ ┃ ┣ 📜CalendarEvent.module.css
 ┃ ┃ ┃ ┣ 📜CalendarGrid.js
 ┃ ┃ ┃ ┣ 📜CalendarGrid.module.css
 ┃ ┃ ┃ ┣ 📜CalendarHeader.js
 ┃ ┃ ┃ ┗ 📜CalendarHeader.module.css
 ┃ ┃ ┣ 📂myProfile
 ┃ ┃ ┃ ┣ 📜ChangeEmailForm.js
 ┃ ┃ ┃ ┣ 📜ChangePasswordForm.js
 ┃ ┃ ┃ ┣ 📜DeleteUser.js
 ┃ ┃ ┃ ┣ 📜MyProfile.js
 ┃ ┃ ┃ ┣ 📜MyProfile.module.css
 ┃ ┃ ┃ ┣ 📜ProfileModal.js
 ┃ ┃ ┃ ┗ 📜ProfileModal.module.css
 ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┣ 📜Header.module.css
 ┃ ┃ ┣ 📜LoginForm.js
 ┃ ┃ ┣ 📜LoginForm.module.css
 ┃ ┃ ┣ 📜RegisterForm.js
 ┃ ┃ ┗ 📜RegisterForm.module.css
 ┃ ┣ 📂providers
 ┃ ┃ ┣ 📜calendarProvider.js
 ┃ ┃ ┗ 📜userUpdateProvider.js
 ┃ ┣ 📂reducers
 ┃ ┃ ┗ 📜registerReducer.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜apiRequest.js
 ┃ ┃ ┗ 📜regEx.js
 ┃ ┣ 📂views
 ┃ ┃ ┣ 📜CalendarPage.js
 ┃ ┃ ┣ 📜ErrorPage.js
 ┃ ┃ ┣ 📜MainPage.js
 ┃ ┃ ┣ 📜MainPage.module.css
 ┃ ┃ ┗ 📜RegisterPage.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜config.js
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.js
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┗ 📜package.json
```


