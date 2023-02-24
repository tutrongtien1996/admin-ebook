const Helper =  {
    filter: {  
        limit: 5, //số lượng orders trên mỗi trang: mặc định 20
        offset: 0, //vị trí đầu tiên trong danh sách order của mỗi trang, (trạng hiện tại - 1)*limit
    },
    setFilter: (input) => {
        var page = input.page
        if(!Number(page) && page){
            Helper.filter.limit = 0;
            return Helper.filter
        }
        if (page == null) {
            page = 1;
        }
        
        if(Number(page) <= 0 || (Number(page) - Math.floor(Number(page))) != 0){
            Helper.filter.limit = 0;
            return Helper.filter
        }
        Helper.filter.offset = (Helper.filter.limit) * (Number(page) - 1); 
        return Helper.filter
    },
    pages: (count) => {
        if(Helper.filter.limit){
            let countPages = (count / Helper.filter.limit) + 1;
            return Array.from({length: countPages}, (_, i) => i + 1)
        }
       return []
    }
}


module.exports = {Helper}
