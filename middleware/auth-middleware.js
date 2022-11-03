const jwt = require("jsonwebtoken");

let AuthMiddleware = {
  userAuth: async (request, response, next) => {
    let token = request.headers["x-auth-token"];

    console.log(token);

    try {
      let details = jwt.verify(token, process.env.PRIVATE_KEY);
      response["user"] = details;
      next();
    } catch (error) {
      response.status(401).send({
        status: false,

        message: "you are not allow over here",
      });

      return false;
    }
  },
};

module.exports = AuthMiddleware;
