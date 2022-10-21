const { db } = require("../helper/database")

const WebsiteModel = {
  list: async function(params) {
    try {
      var results = await db.select('users.id AS user_id', 'users.name AS user_name', 'sites.id AS id', 'sites.name', 'sites.firebase_site_id')
      .from('sites')
      .leftJoin('users', 'sites.user_id', 'users.id')
      return results
    } catch (err) {
      return null;
    }
  }

 
}

module.exports = {WebsiteModel}