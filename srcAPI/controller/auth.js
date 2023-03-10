const {AuthModel} = require('../model/Auth')
const {ResponseSuccess, ResponseFail} = require('../helper/response')
const {jwtHandle} = require('../helper/handlePackage')
const randtoken = require('rand-token')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const AuthAPIController = {
    register: async (req, res) => {
        const username = req.body.username.toLowerCase();
        const user = await AuthModel.getUser(username);
        if (user.length > 0){
            return ResponseFail(res, "username is exist!")
        }
        else {
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
            const newUser = {
                id: uuidv4(),
                name: username,
                password: hashPassword
            };
            const createUser = await AuthModel.createUser(newUser);
            if (!createUser) {
                return ResponseFail(res, "data is error!")
            }
            return ResponseSuccess(res, "", username);
        }
    },
    login: async (req, res) => {
        const username = req.body.username.toLowerCase()
        const password = req.body.password;
    
        const users = await AuthModel.getUser(username);
        if (users.length == 0) {
            return req.isServer ? {value: false, message: "username not's exist!"}  : ResponseFail(res, "username not's exist!")
        }
    
        const isPasswordValid = bcrypt.compareSync(password, users[0].password);
        if (!isPasswordValid) {
             return req.isServer ? {value: false, message: "password is error!"}  : ResponseFail(res, "password is error!")
        }
    
        const accessTokenLife = dotenv.parsed.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = dotenv.parsed.ACCESS_TOKEN_SECRET;
    
        const dataForAccessToken = {
            username: users[0].name,
        };
        const accessToken = await jwtHandle.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return req.isServer ? {value: false, message: "login uncucess"} : ResponseFail(res, "login uncucess")
        }
        let user = users[0]
        let refreshToken = randtoken.generate(50); // t???o 1 refresh token ng???u nhi??n
        if (!user.refreshToken) {
            user.refreshToken  = refreshToken;
            await AuthModel.updateToken(user);

        } else {
            // N???u user n??y ???? c?? refresh token th?? l???y refresh token ???? t??? database
            refreshToken = user.refreshToken;
        }
    
        return !req.isServer ? ResponseSuccess(res, "", {
            accessToken,
            refreshToken,
            user
        }) : {
            value: true,
            accessToken,
            refreshToken,
            user
        }
    },
    refreshToken: async (req, res) => {
        // L???y access token t??? header
        const accessTokenFromHeader = req.headers.authorization;
        if (!accessTokenFromHeader) {
            return ResponseFail(res, "token not's exist!")
        }
    
        // L???y refresh token t??? body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return  ResponseFail(res, "token not's exist!")
        }
    
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    
        // Decode access token ????
        const decoded = await jwtHandle.decodeToken(
            accessTokenFromHeader,
            accessTokenSecret,
        );
        if (!decoded) {
            return ResponseFail(res, "access token is error!")
        }
    
        const username = decoded.payload.username; // L???y username t??? payload
    
        const users = await AuthModel.getUser(username);
        let user = users[0]
        if (!user) {
            return ResponseFail(res, "user is not exist!")
        }
    
        if (refreshTokenFromBody !== user.refreshToken) {
            return ResponseFail(res, "refreshTokenFromBody is error!")
        }
    
        // T???o access token m???i
        const dataForAccessToken = {
            username
        };
    
        const accessToken = await jwtHandle.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        
        if (!accessToken) {
            return ResponseFail(res, "create acces token is unsuccess")
        }
        return ResponseSuccess(res, "", accessToken);
    }
}


module.exports = {AuthAPIController}