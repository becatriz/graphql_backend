const db = require("../../config/db");
const { profile: getProfile } = require("../Query/profile");

module.exports = {
  async createProfile(_, { data }) {
    try {
      const [id] = await db("profiles").insert(data);
      return db("profiles").where({ id }).first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async removeProfile(_, args) {
    try {
      const profile = await getProfile(_, args);
      if (profile) {
        const { id } = profile;
        await db("users_profiles").where({ profile_id: id }).delete();
        await db("profiles").where({ id }).delete();
      }
      return profile;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async updateProfile(_, { filter, data }) {
    try {
      const profile = await getProfile(_, { filter });
      if (profile) {
        const { id } = profile;
        await db("profiles").where({ id }).update(data);
      }
      return { ...profile, ...data };
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
};
