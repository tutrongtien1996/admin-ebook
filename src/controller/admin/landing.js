const landingController = {
    pravicy: (req, res) => {
        return res.render('landing/privacy-policy', {layout: false})
    },
    terms: (req, res) => {
        return res.render('landing/terms_of_services', {layout: false})
    }
}
module.exports = {landingController}