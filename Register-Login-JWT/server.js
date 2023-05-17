require("dotenv").config();
const express = require("express");
const connectDb = require("./database/db");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;


const { registerUser, loginUser, userDetails, addBlog } = require("./controllers/user");
const { requiredAuth } = require("./middleware/authMiddleware");


app.get("/",(req,res)=>{
  res.send("home page ")
})
// app.use("/register", register);
// app.use("/login", login);
app.post('/register',registerUser)
app.post('/login',loginUser)

app.get('/user', requiredAuth, userDetails)
app.post('/addblog',requiredAuth,addBlog)


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is  runing on port no. ${PORT}`);
  });
});
