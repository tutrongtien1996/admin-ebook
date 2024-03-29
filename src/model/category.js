const {db} = require('../helper/connectDB')

const CategoryModel = {
    list: async function(){
        try{
            let results =  await db('categories')
            .select('categories.id', 'categories.name', 'categories.image', db.raw('COUNT(*) as total_books'))
            .leftJoin('books', 'categories.id', 'books.category_id')
            .groupBy('categories.id');
            return results;
        }
        catch {
            return null
        }
    },
    
    create: async function(input){
        try{
            await db('categories').insert({id: input.id, name: input.name, image: input.image})
            return true;
        }
        catch {
            return null
        }
    },

    one: async function(input){
        try{
            let results = await db('categories').select('*').where('id', input.id);
            return results;
        }
        catch {
            return null
        }
    },
    delete: async function(input){
        try{
            let results = await db('categories').where('id', input.id).del()
            return results;
        }
        catch {
            return null
        }
    },
   
    update: async function(input){
        try{
            let results = await db('categories').where('id', input.id).update({name: input.name, image: input.image})
            return results;
        }
        catch {
            return null
        }
    }
}

module.exports = {CategoryModel}