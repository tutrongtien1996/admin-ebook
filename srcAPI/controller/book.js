const {BookModel} = require('../model/book')
const {ResponseSuccess, ResponseFail} = require('../helper/response')
const { v4: uuidv4 } = require('uuid');

const BookController = {
    list: async (req, res) => {
        const results = await  BookModel.list();
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    create: async (req, res) => {
        let input = req.body;
        input.id = uuidv4();
        const results = await BookModel.create(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data error!"))
    }, 
    one: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  BookModel.one(input);
        return (results ? ResponseSuccess(res, "", results[0]) : ResponseFail(res, "data not exist!"))
    }
    ,
    delete: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  BookModel.delete(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    update: async (req, res) => {
        let input = {id: req.params.id,
        data: req.body}
        const results = await  BookModel.update(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    }
}

module.exports = {BookController}