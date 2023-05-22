const {MessageModel} = require('../../model/message')
const {ResponseSuccess, ResponseFail} = require('../../helper/response')
const { v4: uuidv4 } = require('uuid');
const validator = require("email-validator");

const MessageController = {
    list: async (req, res) => {
        const results = await  MessageModel.list();
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    create: async (req, res) => {
        let input = req.body;
        input.id = uuidv4();
        if(validator.validate(input.email)){
            console.log(input)
            const results = await MessageModel.create(input);
            return (results ? ResponseSuccess(res, "", input) : ResponseFail(res, "data error!"))
        }
        return ResponseFail(res, "email not exist")
    }, 
    one: async (req, res) => {
        let input = {id: req.params.id}
        const item = await  MessageModel.one(input);
        return (item ? ResponseSuccess(res, "", item) : ResponseFail(res, "data not exist!"))
    }
}

module.exports = {MessageController}