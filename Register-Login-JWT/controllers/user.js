
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/userSchema");
const Blog = require("../database/blogSchema");


const SECRET_KEY =
  "srtjkjklmnot8852za@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

async function registerUser(req,res){
    const { username, password: pass } = req.body;

    console.log(req.body);

    if (!username || typeof username !== "string") {
      return res.json({
        status: "error",
        error: "Invalid username",
      });
    }
    if (pass.length < 7) {
      return res.json({
        status: "error",
        error: "Password too small. Should be atleast 8 characters",
      });
    }

    const password = bcrypt.hashSync(pass, 10);
    try {
      await User.create({
        username,
        password,
      });

      return res.status(200).send({
        response: "success",
        message: "User Register Successfully",
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({
          status: "error",
          error: "User already exists ",
        });
      }
    }
}


async function loginUser(req, res){
     const { username, password } = req.body;
     console.log(username, password);

     const userFound = await User.findOne({
       username,
     });

     if (!userFound) {
       return res.status(400).send({
         response: "error",
         message: "invalid username",
       });
     } else {
       let matched = bcrypt.compareSync(password, userFound.password);
       console.log(userFound.password);
       if (matched) {
         let { username } = userFound;
         const token = jwt.sign({ username }, SECRET_KEY, {expiresIn:'1h'});
         res.status(200).send({
           response: "Success",
           message: "Successfully logged in",
           user: username,
         });
         console.log(token);
       } else {
         return res.status(400).send({
           response: "Error",
           message: "Invalid Password",
         });
       }
     }
}

async function userDetails(req,res){
    res.send("hi may name is anil")
}

async function addBlog(req,res){
     let { title, author, content } = req.body;

     if (!title) {
       return res.send({
         response: "error",
         message: "add title ",
       });
     } else {
       await Blog.create({
         title,
         author,
         content,
       });

       return res.status(200).send({
         response: "success",
         message: "Blog is created Successfully",
       });
     }
}

module.exports={loginUser,registerUser,userDetails, addBlog}