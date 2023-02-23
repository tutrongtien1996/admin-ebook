const {CategoryModel} = require('../model/category')
const {ResponseSuccess, ResponseFail} = require('../helper/response')
const { v4: uuidv4 } = require('uuid');

const CategoryController = {
    list: async (req, res) => {
        const results = await  CategoryModel.list();
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    create: async (req, res) => {
        let input = {
            id: uuidv4(),
            name: req.body.name
        }
        const results = await CategoryModel.create(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data error!"))
    }, 
    one: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  CategoryModel.one(input);
        return (results ? ResponseSuccess(res, "", results[0]) : ResponseFail(res, "data not exist!"))
    }
    ,
    delete: async (req, res) => {
        let input = {id: req.params.id}
        const results = await  CategoryModel.delete(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    update: async (req, res) => {
        let input = {id: req.params.id,
        name: req.body.name}
        const results = await  CategoryModel.update(input);
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    }

}

module.exports = {CategoryController}