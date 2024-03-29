const {db} = require('../helper/connectDB')
const AuthModel = {
    getUser: async username => {
        try {
            const data = await db('admins').select('*').where('name', username);
            return data;
        } catch {
            return null;
        }
    },
    createUser: async user => {
        try {
            await db('admins').insert(user)
            return true;
        } catch {
            return false;
        }
    },
    updateToken: async function(input){
        try{
            let results = await db('admins').where('id', input.id).update('refreshToken', input.refreshToken)
            return results;
        }
        catch {
            return null
        }
    }
}


module.exports = {AuthModel}


