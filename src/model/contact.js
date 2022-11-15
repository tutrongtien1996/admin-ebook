const { db } = require("../helper/database")

const ContactModel = {
  list: async function(params) {
    try {
      var results = await db.from('contacts').select("*")
      return results
    } catch (err) {
      return null;
    }
  }
}

module.exports = {ContactModel}