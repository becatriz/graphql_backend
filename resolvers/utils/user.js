const jwt = require("jwt-simple");

const { profiles: getProfiles } = require("../Type/User");

module.exports = {
  async getUserLoggedIn(user) {
    const profiles = await getProfiles(user);
    const now = Math.floor(Date.now() / 1000);

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      profiles: profiles.map((profile) => profile.name),
      iat: now,
      exp: now + 3 * 24 * 60 * 60,
    };

    const authSecret = process.env.APP_AUTH_SECRET;

    return {
      ...userInfo,
      token: jwt.encode(userInfo, authSecret),
    };
  },
};
