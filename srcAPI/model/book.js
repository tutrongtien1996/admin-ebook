const {db} = require('../common/connectDB');

const BookModel = {
    list: async function(filter){
        try{
            let query = db('books').clone().orderBy('created_at', 'desc');
            if (filter.category_id) {
                query = query.where("category_id", "=", filter.category_id);
            }
            if (filter.user_id) {
                query = query.where("user_id", "=", filter.user_id);
            }
            if (filter.keyword) {
                query = query.where("books.name", "LIKE", `%${filter.keyword}%`);
            }

            let countQuery = query.clone().count("* as count");
            let resultQuery = query.clone()
            .select('books.*', db.raw(
                "IF(books.image <> '', IF(LOCATE('http', books.image) > 0, books.image, CONCAT('" + process.env.APP_URL + "/', books.image)), null) as image"
                ), 
                'categories.id as category_id',
                'categories.name as category_name',
                'categories.image as category_image',
                'users.id as user_id',
                'users.name as user_name',
                'users.image as user_image'
            )
            .leftJoin('categories', 'books.category_id', 'categories.id')
            .leftJoin('users', 'books.user_id', 'users.id')
            if (filter.limit != -1) {
                resultQuery = resultQuery.limit(filter.limit)
                .offset(filter.offset);
            }
            let [{ count }] = await countQuery;
            let results = await resultQuery;
            return { results, count: count };
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

    detail: async function(input){
        try{
            let results = await db('books').select('books.*', db.raw(
                "IF(books.image <> '', IF(LOCATE('http', books.image) > 0, books.image, CONCAT('" + process.env.APP_URL + "/', books.image)), null) as image"
                ), 
                'categories.id as category_id',
                'categories.name as category_name',
                'categories.image as category_image',
                'users.id as user_id',
                'users.name as user_name',
                'users.image as user_image'
            )
            .leftJoin('categories', 'books.category_id', 'categories.id').leftJoin('users', 'books.user_id', 'users.id').where('books.id', input.id);
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
            await db('books').where('id', input.id).update(input.data)
            return true;
        }
        catch {
            return null
        }
    }
}

module.exports = {BookModel}