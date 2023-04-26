const Converter =  {
    Book: (item) => {
        if (item) {
            return {
                id: item.id,
                name: item.name,
                category_id: item.category_id,
                user_id: item.user_id,
                description: item.description,
                image: item.image,
                audio_url: item.audio_url,
                count_view: item.count_view,
                count_rate:  item.count_rate,
                youtube_id: item.youtube_id,
                chanel_video: item.chanel_video,
                created_at: item.created_at,
                updated_at: item.updated_at,
                category: {
                    id: item.category_id,
                    name: item.category_name,
                    image: item.category_image,
                },
                user: {
                    id: item.user_id,
                    name: item.user_name,
                    image: item.user_image,
                },
            }
        } else {
            return null;
        }
    },
    BookList: (listItems) => {
        var result = []
        listItems.forEach(item => {
            result.push(Converter.Book(item))
        })
        return result
    },
    Category: (item) => {
        return item
    }
}


module.exports = {Converter}
