const homeController = {
    index: (req, res) => {
        return res.render('web/home', {layout: false})
    },
    pravicy: (req, res) => {
        return res.render('web/privacy-policy', {layout: false})
    },
    terms: (req, res) => {
        return res.render('web/terms_of_services', {layout: false})
    }
}
module.exports = {homeController}