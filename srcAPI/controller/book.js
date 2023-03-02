const {BookModel} = require('../model/book')
const {ResponseSuccess, ResponseFail} = require('../helper/response')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

const BookController = {
    list: async (req, res) => {
        const results = await  BookModel.list_api();
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    create: async (request, res) => {
        var input =  request.body;
        request.file ? (input.image = request.file.path) : (input.image = "")
        if(!request.body.name && request.file){
            fs.unlinkSync(request.file.path);
          }
          if(!request.body.name){return ResponseFail(res, "data error!")}

        input.id = uuidv4();
        const results = await BookModel.create(input);
        if(!results && request.file){
            fs.unlinkSync(request.file.path);
        }
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
        const data = await  BookModel.one(input);
        if(!data){
          return  ResponseFail(res, "data not exist!")
        }
        const results = await  BookModel.delete(input);
        if(results && data[0].image){
            if(fs.existsSync( data[0].image )){
              fs.unlinkSync(data[0].image);
              } 
        }
        return (results ? ResponseSuccess(res, "", results) : ResponseFail(res, "data not exist!"))
    },
    update: async (request, res) => {
        request.file ? (request.body.image = request.file.path) : (request.body.image = "")
        if(!request.body.name && request.file){
            fs.unlinkSync(request.file.path);
          }
        if(!request.body.name){return ResponseFail(res, "data error!")}
        let input = {id: request.params.id,
        data: request.body}
        const data_get = await BookModel.one(input);
        if(!data_get){
            return  ResponseFail(res, "data not exist!");
          }
        const results = await  BookModel.update(input);
        if(!results && request.file){
            fs.unlinkSync(request.file.path);
        }
        if(results && data_get[0].image){
            if(fs.existsSync( data_get[0].image )){
             fs.unlinkSync(data_get[0].image);
            }  
        }
        return (results ? ResponseSuccess(res, "", input) : ResponseFail(res, "data not exist!"))
    }
}

module.exports = {BookController}