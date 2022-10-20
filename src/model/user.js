const { db } = require("../helper/database")

const UserModel = {
  list: async function(params) {
    try {
      var results = await db.from('users').select("*")
        .orderBy('created_at', 'desc')
      return results
    } catch (err) {
      return null;
    }
  },

  find: async function(params) {
    try {
      var query = db.from('users').select("*")
      params.each((key, value) => {
        switch (key) {
            case "id":
            case "email":
              query = query.where(key, value)
              break;
            default:
              break;
          }
      })
      var result = await query.first()
      return result
    } catch (err) {
      return null;
    }
  }
}

module.exports = {UserModel}