This is a  pintrest-clone that allows users to register, login, and logout. It also allows users to view their profile page. 


npx express-generator
npm install

npx nodemon

<!-- for authentication -->
npm i passport passport-local passport-local-mongoose express-session 

<!-- for flash(error message) -->
npm i connect-flash

<!-- for unique id -->
npm i uuid

<!-- for file upload -->
npm i multer


-------- router.methods -----
GET : Display Home Page
POST : Handle User Registration Form Submission
Dynamic Route Parameter: Display User Profile