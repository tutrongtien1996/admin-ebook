const { db } = require("../helper/database")

const TemplateModel = {
  list: async function(params) {
    try {
      var results = await db.from('templates').select("*")
      return results
    } catch (err) {
      return null;
    }
  }
  
}

module.exports = {TemplateModel}