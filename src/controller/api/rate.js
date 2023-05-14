const {RateModel} = require('../../model/rate')
const {ResponseSuccess, ResponseFail} = require('../../helper/response')
const { v4: uuidv4 } = require('uuid');
const { getErrors } = require('../../helper/rateValidate');

const RateController = {
    list: async (req, res) => {
        const results = await  RateModel.list();
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    create: async (req, res) => {
        let input = req.body;
        input.id = uuidv4();
        let checkRate = getErrors(input)
        if(checkRate.status){
            return ResponseFail(res, checkRate.message)
        }
        const item = await  RateModel.device_id(input);
        if(item.length == 0){
            const results = await RateModel.create(input);
            return (results ? ResponseSuccess(res, "", input) : ResponseFail(res, "data error!"))
        }
        return ResponseFail(res, "This id has been rated 1 time")
    }, 
    one: async (req, res) => {
        let input = {id: req.params.id}
        const item = await  RateModel.one(input);
        return (item ? ResponseSuccess(res, "", item) : ResponseFail(res, "data not exist!"))
    }
    ,
    delete: async (req, res) => {
        let input = {id: req.params.id,
        data: req.body}
        const item = await  RateModel.one(input);
        if(item.length > 0){
            const results = await  RateModel.delete(input);
            return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "khong the xoa id nay!"))
        }
        return ResponseFail(res, "data not exist!")  
    },
    update: async (req, res) => {
        let input = {id: req.params.id,
        data: req.body}
        let checkRate = getErrors(input.data)
        if(checkRate.status){
            return ResponseFail(res, checkRate.message)
        }
        const item = await  RateModel.one(input);
        if(item.length > 0){
            const results = await  RateModel.update(input);
            return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "This rate adjustment is not allowed"))
        }
        return  ResponseFail(res, "This rate adjustment is not allowed")
    }
}

module.exports = {RateController}