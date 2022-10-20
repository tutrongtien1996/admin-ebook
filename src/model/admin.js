const { db } = require("../helper/database")

const AdminModel = {
  list: async function(params) {
    try {
      var results = await db.from('admins').select("*")
        .orderBy('created_at', 'desc')
      return results
    } catch (err) {
      return null;
    }
  },

  find: async function(params) {
    try {
      var query = db.from('admins').select("*")
      if (Object.keys(params).length > 0) {
        for (const key in params) {
          switch (key) {
            case "id", "email":
              query = query.where(key, params[key])
              break;
            default:
              break;
          }
        }
      }
      var result = await query.first()
      return result
    } catch (err) {
      return null;
    }
  }
}

module.exports = {AdminModel}