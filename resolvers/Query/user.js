const db = require("../../config/db");
const bcrypt = require("bcrypt-nodejs");
const { getUserLoggedIn } = require("../utils/user");

module.exports = {
  async login(_, { data }) {
    const user = await db("users").where({ email: data.email }).first();

    if (!user) {
      throw new Error("Email or password invalid!");
    }

    const passwordEquals = bcrypt.compareSync(data.password, user.password);

    if (!passwordEquals) {
      throw new Error("Email or password invalid!");
    }

    return getUserLoggedIn(user);
  },

  users(_, args, ctx) {
    ctx && ctx.validateAdmin();

    return db("users");
  },
  user(_, { filter }, ctx) {
    ctx && ctx.validateUserFilter(filter);

    if (!filter) return null;
    const { id, email } = filter;
    if (id) {
      return db("users").where({ id }).first();
    } else if (email) {
      return db("users").where({ email }).first();
    } else {
      return null;
    }
  },
};
