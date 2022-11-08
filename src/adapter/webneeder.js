const axios = require('axios');
const { constants } = require("../helper/constant");

const WebNeederAdapter = {

    configHeader: {
        headers: {
            "Server-Key": process.env.WEBNEEDER_SERVER_KEY,
        }
    },

    ImportTemplate: function (input) {
        axios.post(constants.WEBNEEDER_URL + "/download", input, WebNeederAdapter.configHeader).then(function(response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error.response.data)
        })
    },

    DeleteTemplate: function (id) {
        axios.delete(constants.WEBNEEDER_URL + "/" + id,  WebNeederAdapter.configHeader).then(function(response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error.response.data)
        })
        
    },
    UpdateTemplate: function (id, input) {
        axios.put(constants.WEBNEEDER_URL + "/" + id, input,  WebNeederAdapter.configHeader).then(function(response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error.response.data)
        })
    },
}

module.exports = {WebNeederAdapter}