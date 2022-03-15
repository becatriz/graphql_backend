const db = require("../../config/db");

module.exports = {
  profiles(_, args, ctx) {
    ctx && ctx.validateAdmin();
    return db("profiles");
  },
  profile(_, { filter }, ctx) {
    ctx && ctx.validateAdmin();

    if (!filter) return null;
    const { id, name } = filter;
    if (id) {
      return db("profiles").where({ id }).first();
    } else if (name) {
      return db("profiles").where({ name }).first();
    } else {
      return null;
    }
  },
};
