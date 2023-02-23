function ResponseSuccess(res, message, data) {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    return res.json({
        success: true,
        message: message != "" ? message : "Successful",
        data: data,
    })
}
function ResponseFail(res, message, data=null) {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
        success: false,
        message:  message != "" ? message : "Bad request",
        data: data,
    }))
}
module.exports = {ResponseSuccess, ResponseFail}