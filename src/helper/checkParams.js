const Helper =  {
    setFilter: (input) => {
        var filter = {}
        var page = input.page
        if(!Number(page) && page){
            filter.limit = 0;
        }
        if (page == null) {
            page = 1;
        }
        
        if(Number(page) <= 0 || (Number(page) - Math.floor(Number(page))) != 0){
            filter.limit = 0;
        }
        if (input.category_id) {
            filter.category_id = input.category_id
        }
        if (input.user_id) {
            filter.user_id = input.user_id
        }
        filter.offset = (filter.limit) * (Number(page) - 1);
        return filter
    },
    pages: (limit, count) => {
        if(limit){
            let countPages = (count / limit) + 1;
            return Array.from({length: countPages}, (_, i) => i + 1)
        }
       return []
    }
}


module.exports = {Helper}
