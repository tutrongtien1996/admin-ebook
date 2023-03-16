const dotenv = require('dotenv');
const {db} = require('../common/connectDB');

const BookModel = {
    list_api: async function(filter){
        try{
            let results =  await db('books').select("*", db.raw(
                "IF(image <> '', IF(LOCATE('http',image) > 0, image, CONCAT('"+process.env.APP_URL+"/', image)), null) as image"
              )).limit(filter.limit).offset(filter.offset).orderBy('created_at', 'desc');
            return {results};
        }
        catch {
            return null
        }
    },
    list: async function(filter){
        try{
            let count =  await db('books').count('id',{as: 'count'});
            let results =  await db('books').select("*", db.raw(
                "IF(image <> '', IF(LOCATE('http',image) > 0, image, CONCAT('"+process.env.APP_URL+"/', image)), null) as image"
              )).limit(filter.limit).offset(filter.offset).orderBy('created_at', 'desc');
            return {results, count: count[0].count};
        }
        catch {
            return null
        }
    },
    
    create: async function(input){
        try{
            await db('books').insert(input)
            return true;
        }
        catch {
            return null
        }
    },

    one: async function(input){
        try{
            let results = await db('books').select('books.id', 'books.name', 'books.category_id', 'books.user_id', 'books.image', 'books.audio_url', 'books.description', 'books.youtube_id', 'books.chanel_video', 'categories.name as category_name', 'users.name as author_name', db.raw(
                "IF(image <> '', IF(LOCATE('http',image) > 0, image, CONCAT('"+process.env.APP_URL+"/', image)), null) as image"
              ))
            .leftJoin('categories', 'books.category_id', 'categories.id').leftJoin('users', 'books.user_id', 'users.id').where('books.id', input.id);
            return results;
        }
        catch {
            return null
        }
    },
    detail: async function(input){
        try{
            let results = await db('books').select('books.id', 'books.name', 'books.category_id', 'books.user_id', 'categories.name as category_name', 'users.name as author_name', db.raw(
                "IF(image <> '', IF(LOCATE('http',image) > 0, image, CONCAT('"+process.env.APP_URL+"/', image)), null) as image"
              ))
            .leftJoin('categories', 'books.category_id', 'categories.id').leftJoin('users', 'books.user_id', 'users.id').where('books.category_id', input.id);
            return results;
        }
        catch {
            return null
        }
    },
    delete: async function(input){
        try{
            await db('books').where('id', input.id).del()
            return true;
        }
        catch {
            return null
        }
    },
   
    update: async function(input){
        try{
            let results = await db('books').where('id', input.id).update(input.data)
            return true;
        }
        catch {
            return null
        }
    }
}

module.exports = {BookModel}