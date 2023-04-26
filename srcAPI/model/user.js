const {db} = require('../common/connectDB')

const UserModel = {
    list: async function(){
        try{
            let results =  await await db('users')
            .select('users.id', 'users.name', 'users.image', db.raw('COUNT(*) as total_books'))
            .leftJoin('books', 'users.id', 'books.user_id')
            .groupBy('users.id')
            return results;
        }
        catch {
            return null
        }
    },
    
    create: async function(input){
        try{
            await db('users').insert(input)
            return true;
        }
        catch {
            return null
        }
    },

    list_book: async function(input){
        try{
            let results =  await db('books').select('*').where('user_id', input.id);
            return results;
        }
        catch {
            return null
        }
    },

    one: async function(input){
        try{
            let results = await db('users').select('*').where('id', input.id);
            return results;
        }
        catch {
            return null
        }
    },
    delete: async function(input){
        try{
            let results = await db('users').where('id', input.id).del()
            return results;
        }
        catch {
            return null
        }
    },
   
    update: async function(input){
        console.log(input)
        try{
            let results = await db('users').where('id', input.id).update(input.data)
            return results;
        }
        catch {
            return null
        }
    }
}

module.exports = {UserModel}