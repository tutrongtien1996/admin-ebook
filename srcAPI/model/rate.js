const {db} = require('../common/connectDB')

const RateModel = {
    list: async function(){
        try{
            let results =  await db('rates').select('*')
            return results;
        }
        catch {
            return null
        }
    },
    
    create: async function(input){
        try{
            await db('rates').insert(input)
            return true;
        }
        catch {
            return null
        }
    },
    device_id: async function(input){
        try{
            let results = await db('rates').select('*').where('device_id', input.device_id);
            return results;
        }
        catch {
            return null
        }
    },
    one: async function(input){
        try{
            let results = await db('rates').select('*').where('id', input.id);
            return results;
        }
        catch {
            return null
        }
    },
    delete: async function(input){
        try{
            let results = await db('rates').where('id', input.id).andWhere('device_id', input.data.device_id).del()
            return results;
        }
        catch {
            return null
        }
    },
   
    update: async function(input){
        try{
            let results = await db('rates').where('id', input.id).andWhere('device_id', input.data.device_id).update(input.data)
            return results;
        }
        catch {
            return null
        }
    }
}

module.exports = {RateModel}