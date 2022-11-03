const { db } = require("../helper/database")

const TemplateModel = {
  list: async function(params) {
    try {
      var results = await db.from('templates').select("*")
      return results
    } catch (err) {
      return null;
    }
  },

  createTemplate: async function(input){
   try {
    let id = Math.floor(Math.random() * 100000)
    await db('templates').insert(
      {
        id: id,
        name: input.name, 
        zip_url: input.zip_url,
        category_id: input.category}
    )
    return true
   }
   catch (err){
    return err
   }
  }
}

module.exports = {TemplateModel}