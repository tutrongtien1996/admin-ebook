const axios = require('axios');
const { constants } = require("../helper/constant");

const WebNeederAdapter = {
    ImportTemplate: function (input) {
        axios.post(constants.WEBNEEDER_URL, input).then(function(response) {
            console.log(response.data)
        }).catch(function(error) {
            console.log(error.response.data)
        })
    }
}

module.exports = {WebNeederAdapter}