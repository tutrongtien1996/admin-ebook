const {db} = require('../helper/connectDB');

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
            if (filter.ids && filter.ids.length > 0) {
                query = query.whereIn("books.id", filter.ids);
            }
            if (filter.exclude_ids && filter.exclude_ids.length > 0) {
                query = query.whereNotIn("books.id", filter.exclude_ids);
            }
            if (filter.related_id) {
                const relatedBook = await db('books').select('user_id', 'category_id').where('id', filter.related_id).first();
                if (relatedBook) {
                    query = query.where("books.category_id", "=", relatedBook.category_id)
                    .where("books.user_id", "=", relatedBook.user_id)
                    .where("books.id", "<>", filter.related_id)
                }
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
            if (filter.limit != -1 && filter.limit != undefined) {
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
            let result = await db('books')
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
                .where('books.id', input.id)
                .first();
            return result;
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