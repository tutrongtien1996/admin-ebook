const {db} = require('../helper/connectDB')

const VersionAppModel = {

    newVersion: async function(input){
        try{
            let results = await db('app_versions').select('*').where('platform', input.platform).orderBy('created_at', 'desc').first();
            return results;
        }
        catch {
            return null
        }
    }
}

module.exports = {VersionAppModel}