const db = require("../../config/db");

module.exports = {
  profiles() {
    return db("profiles");
  },
  profile(_, { filter }) {
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
