const {UserModel} = require('../../model/user')
const {ResponseSuccess, ResponseFail, getResponse} = require('../../helper/response')
const { v4: uuidv4 } = require('uuid');

const UserController = {
    list: async (req, res) => {
        const results = await  UserModel.list();
        let response = getResponse(1, results.length, -1, results)
        return (results ? ResponseSuccess(res, "", response) : ResponseFail(res, "data not exist!"))
    },
    create: async (req, res) => {
        let input = req.body;
        input.id = uuidv4();
        const results = await UserModel.create(input);
        return (results ? ResponseSuccess(res, "", input) : ResponseFail(res, "data error!"))
    }, 
    one: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  UserModel.one(input);
        return (results ? ResponseSuccess(res, "", results[0]) : ResponseFail(res, "data not exist!"))
    }
    ,
    delete: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  UserModel.delete(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    update: async (req, res) => {
        let input = {id: req.params.id,
        data: req.body}
        const results = await  UserModel.update(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    }
}

module.exports = {UserController}