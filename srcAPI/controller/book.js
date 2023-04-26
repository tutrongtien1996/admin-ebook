const {BookModel} = require('../model/book')
const {ResponseSuccess, ResponseFail, getResponse} = require('../helper/response')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const { Helper } = require('../../src/helper/checkParams');
const { Converter } = require('../../src/helper/Converter');

const BookController = {
    list: async (req, res) => {
        let query = req.query
        let params = {
            page: 1,
            limit: 20
        }
        if (query.limit && (query.limit >= 1 || query.limit == -1)) {
            params.limit = parseInt(query.limit)
        }
        if (query.page && query.page >= 1) {
            params.page = parseInt(query.page)
        }
        if (query.category_id) {
            params.category_id = query.category_id 
        }
        if (query.user_id) {
            params.user_id = query.user_id 
        }
        if (query.keyword) {
            params.keyword = query.keyword 
        }
        params.offset = params.limit * (params.page - 1)
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
        const results = await  BookModel.detail(input);
        if(results.length > 0){
            let item = {
                id: results[0].id,
                name: results[0].name,
                count_view: results[0].count_view,
                count_rate: results[0].count_rate,
                description: results[0].description,
                image: results[0].image,
                audio_url: results[0].audio_url,
                youtube_id: results[0].youtube_id,
                chanel_video: results[0].chanel_video,
                created_at: results[0].created_at,
                updated_at: results[0].updated_at,
                user: {
                    id: results[0].user_id,
                    name: results[0].user_name,
                    image: results[0].user_image
                },
                category: {
                    id: results[0].category_id,
                    name: results[0].category_name,
                    image: results[0].category_image
                }
            }
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