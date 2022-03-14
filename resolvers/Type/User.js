const db = require("../../config/db");

module.exports = {
  profiles(user) {
    return db("profiles")
      .join("users_profiles", "profiles.id", "users_profiles.profile_id")
      .where({ user_id: user.id });
  },
};
