const db = require("../../config/db");
const { profile: getProfile } = require("../Query/profile");
const { user: getUser } = require("../Query/user");

module.exports = {
  async createUser(_, { data }) {
    try {
      const idsProfile = [];
      if (data.profiles) {
        for (let filter of data.profiles) {
          const profile = await getProfile(_, {
            filter,
          });
          if (profile) idsProfile.push(profile.id);
        }
      }

      delete data.profiles;

      const [id] = await db("users").insert(data);

      for (let profile_id of idsProfile) {
        await db("users_profiles").insert({ profile_id, user_id: id });
      }

      return db("users").where({ id }).first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async removeUser(_, args) {
    try {
      const user = await getUser(_, args);
      if (user) {
        const { id } = user;
        await db("users_profiles").where({ user_id: id }).delete();
        await db("users").where({ id }).delete();
      }
      return user;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },
  async updateUser(_, { filter, data }) {
    try {
      const user = await getUser(_, { filter });
      if (user) {
        const { id } = user;
        if (data.profiles) {
          await db("users_profiles").where({ user_id: id }).delete();

          for (let filter of data.profile) {
            const perfil = await getProfile(_, {
              filter,
            });

            if (perfil) {
              await db("users_profile").insert({
                profile_id: perfil.id,
                user_id: id,
              });
            }
          }
        }

        delete data.profiles;
        await db("users").where({ id }).update(data);
      }
      return !user ? null : { ...user, ...data };
    } catch (e) {
      throw new Error(e);
    }
  },
};
