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
        let refreshToken = randtoken.generate(50); // tạo 1 refresh token ngẫu nhiên
        if (!user.refreshToken) {
            user.refreshToken  = refreshToken;
            await AuthModel.updateToken(user);

        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
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
        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.authorization;
        if (!accessTokenFromHeader) {
            return ResponseFail(res, "token not's exist!")
        }
    
        // Lấy refresh token từ body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return  ResponseFail(res, "token not's exist!")
        }
    
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    
        // Decode access token đó
        const decoded = await jwtHandle.decodeToken(
            accessTokenFromHeader,
            accessTokenSecret,
        );
        if (!decoded) {
            return ResponseFail(res, "access token is error!")
        }
    
        const username = decoded.payload.username; // Lấy username từ payload
    
        const users = await AuthModel.getUser(username);
        let user = users[0]
        if (!user) {
            return ResponseFail(res, "user is not exist!")
        }
    
        if (refreshTokenFromBody !== user.refreshToken) {
            return ResponseFail(res, "refreshTokenFromBody is error!")
        }
    
        // Tạo access token mới
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