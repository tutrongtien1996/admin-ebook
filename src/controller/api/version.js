const {VersionAppModel} = require('../../model/versionApp')
const {ResponseSuccess, ResponseFail, getResponse} = require('../../helper/response')

const ios_download = "link_ios_download";
const android_download = "link_android_download";

const VersionAppController = {
    one: async (req, res) => {
        input = {}
        if(req.query.current_version && req.query.platform){
            input.current_version = req.query.current_version;
            input.platform = req.query.platform.toUpperCase()
        }
        const results = await VersionAppModel.newVersion(input);
        if(!results){
            return ResponseFail(res, "data is errors")
        }
        let data = {
            version: results.current_version,
            link: (input.platform == "IOS") ? ios_download : android_download,
            release_note: results.release_note
        }
        if(results && results.current_version == input.current_version){
            data.status = "OK"
            return ResponseSuccess(res, "", data)
        }
        
        data.status = results.status;
        return ResponseSuccess(res, "", data)
    }
}

module.exports = {VersionAppController}