const BookList = function(query) {
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
    if (query.ids) {
        params.ids = Array.isArray(query.ids) ? query.ids : [query.ids]
    }
    if (query.exclude_ids) {
        params.exclude_ids = Array.isArray(query.exclude_ids) ? query.exclude_ids : [query.exclude_ids]
    }
    if (query.related_id) {
        params.related_id = query.related_id
    }
    if (query.keyword) {
        params.keyword = query.keyword 
    }
    params.offset = params.limit * (params.page - 1)
    return params
}

module.exports = {BookList}