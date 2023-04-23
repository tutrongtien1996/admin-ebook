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
function getResponse(currentPage, totalItems, limit, items) {
    let totalPages = 1
    if(limit && limit != -1){
        totalPages = parseInt((totalItems / limit) + 1);
    }
    if (limit == -1) {
        totalPages = 1
    }
    let response = {
        items: items,
        pagination: {
            total_items: totalItems,
            total_pages: totalPages,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1
        }
    }
    return response
}
module.exports = {ResponseSuccess, ResponseFail, getResponse}