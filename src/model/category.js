const { db } = require("../helper/database")

const CategoryModel = {
  
  list: async function(params) {
    try {
      var results = await db.from('categories').select("*")
        .orderBy('display_order', 'asc')
      return results
    } catch (err) {
      return null;
    }
  }

 
}

module.exports = {CategoryModel}