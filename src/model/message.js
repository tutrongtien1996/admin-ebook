const {db} = require('../helper/connectDB')

const MessageModel = {
    list: async function(filter){
        try{
            let query = db('messages').clone().orderBy('created_at', 'desc');
            let countQuery = query.clone().count("* as count");
            let resultQuery = query.clone().select('messages.*')
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
            await db('messages').insert(input)
            return true;
        }
        catch {
            return null
        }
    },
    one: async function(input){
        try{
            let item = await db('messages').select('*').where('id', input.id).first();
            return item;
        }
        catch {
            return null
        }
    }
}

module.exports = {MessageModel}