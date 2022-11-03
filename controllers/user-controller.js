const { response } = require("express");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const UserController = {
  userSignUp: async (request, response) => {
    let data = request.body;
    try {
      let userResult = await UserModel.findOne({ username: data.username });
      if (userResult) {
        response.status(200).send({
          status: false,
          message: "User already exists",
        });
      } else {
        let newUser = new UserModel({
          fullname: data.fullname,
          email: data.email,
          phonenumber: data.phonenumber,
          username: data.username,
          password: data.password,
          role: data.role,
        });
        let result = await newUser.save();
        if (result === null) {
          response.status(200).send({
            status: true,
            message: "unable to add user",
          });
        } else {
          response.status(200).send({
            status: true,
            message: "User details added successfully",
          });
        }
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  userLogin: async (request, response) => {
    let data = request.body;
    try {
      let userResult = await UserModel.findOne({
        username: data.username,
        password: data.password,
      });
      if (userResult) {
        let user = {
          fullname: userResult.fullname,
          username: userResult.username,
          role: userResult.role,
          id: userResult._id,
        };
        let auth_token = await jwt.sign(user, process.env.PRIVATE_KEY);
        response.header("access-control-expose-headers", "x-auth-token");
        response.header("x-auth-token", auth_token);
        response.status(200).send({
          status: true,
        });
      } else {
        response.status(200).send({
          status: false,
          message: "Invalid Username or Password",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  userProfile: async (request, response) => {
    let data = response.user;
    try {
      let userResult = await UserModel.findById(data.id, { password: 0 });
      if (userResult) {
        response.status(200).send({
          status: true,
          userDetails: userResult,
        });
      } else {
        response.status(200).send({
          status: false,
          message: "user not found",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },

  // userProfile: async (request, response) => {
  //   let token = request.headers["x-auth-token"];
  //   try {
  //     let userdetails = jwt.verify(token, process.env.PRIVATE_KEY);

  //     response.status(200).send({
  //       status: true,

  //       userdetails,

  //       message: "Verify",
  //     });
  //   } catch (error) {
  //     response.status(401).send({
  //       status: false,

  //       message: "you are not allow over here",
  //     });
  //   }
  // },
  // let token = request.headers["x-auth-token"];
  // try {
  //   let userResult = jwt.verify(token, process.env.PRIVATE_KEY);
  //   if (userResult) {
  //     response.status(200).send({
  //       status: true,
  //       userDetails: userResult,
  //       message: "verify",
  //     });
  //   } else {
  //     response.status(200).send({
  //       status: false,
  //       message: "user not found",
  //     });
  //   }
  // } catch (error) {
  //   response.status(400).send({
  //     status: false,
  //     error,
  //   });
  // }
};

module.exports = UserController;
