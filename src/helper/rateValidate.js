

function getErrors(input){
    if(input.content.length > 1000 ){
        let errors = {
            status: true,
            message: "content should not exceed 1000 characters"
        }
        return errors
    }
    if(!Number(input.rate)){
        let errors = {
            status: true,
            message: "rate must be a number"
        }
        return errors
    }
    if((Number(input.rate) < 0) ||  (Number(input.rate) > 5)){
        let errors = {
            status: true,
            message: "rate must be greater than 0 and be min than 5"
        }
        return errors
    }
    let errors = {
        status: false,
        message: ""
    }
    return errors
}

module.exports = {getErrors}