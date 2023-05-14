const {BookModel} = require('../../model/book')
const {ResponseSuccess, ResponseFail, getResponse} = require('../../helper/response')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const { Converter } = require('../../helper/Converter');
const { BookList } = require('../request/book');

const BookController = {
    list: async (req, res) => {
        let params = BookList(req.query)
        params.status = 1
        const data = await  BookModel.list(params);
        if (data) {
            let convertedItems = Converter.BookList(data.results) 
            let response = getResponse(params.page, data.count, params.limit, convertedItems)
            return ResponseSuccess(res, "", response)
        }
        return ResponseFail(res, "data not exist!")
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
        const result = await  BookModel.detail(input);
        if(result){
            let item = Converter.Book(result)
            input.data = {count_view : Number(item.count_view) + 1}
            await  BookModel.update(input)
            return ResponseSuccess(res, "", item) 
        }
        return  ResponseFail(res, "data not exist!")
    }
    ,
    delete: async (req, res) => {
        let input = {id: req.params.id}
        const data = await  BookModel.detail(input);
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
        const data_get = await BookModel.detail(input);
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