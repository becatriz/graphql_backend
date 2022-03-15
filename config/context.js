const jwt = require("jwt-simple");

module.exports = async ({ req }) => {
  await require("./loginFaker")(req);

  const auth = req.headers.authorization;
  const token = auth && auth.substring(7);

  let user = null;
  let admin = false;

  if (token) {
    try {
      let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET);

      if (new Date(tokenContent.exp * 1000) > new Date()) {
        user = tokenContent;
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (user && user.profiles) {
    admin = user.profiles.includes("admin");
  }

  const err = new Error("Access denied!");

  return {
    user,
    admin,
    validateUser() {
      if (!user) throw err;
    },
    validateAdmin() {
      if (!admin) throw err;
    },
  };
};
