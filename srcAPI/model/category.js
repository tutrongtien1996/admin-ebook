const {db} = require('../common/connectDB')

const CategoryModel = {
    list: async function(){
        try{
            let results =  await db('categories').select('*');
            return results;
        }
        catch {
            return null
        }
    },
    
    create: async function(input){
        try{
            await db('categories').insert({id: input.id, name: input.name})
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
            let results = await db('categories').where('id', input.id).update({name: input.name})
            return results;
        }
        catch {
            return null
        }
    }
}

module.exports = {CategoryModel}