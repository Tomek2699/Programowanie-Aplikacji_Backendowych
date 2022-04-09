const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")


const User = require('../DataBase/userModel')
const auth = require('../DataBase/authentiction')
const secret:string = "xxx"


export class UserService {
    async AddUser(username: string, password: string) {
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            password: passwordHash
        })
        const savedUser = await newUser.save()
        return savedUser
    }

    async LoginUser(username: string, password: string) {
        try {
            const user = await User.findOne({ username: username })
            if (!user) {
                throw "Użytkownik nie istnieje!"
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw "Niepoprawne hasło"
            }

            const payload = {
                id: user._id,
                username: user.username
            }

            const signInOptions = {
                expiresIn: '3h'
            }

            const token = jwt.sign(payload, secret, signInOptions)

            return token
        }
        catch (error) {
            throw error
        }
    }

    async DeleteUser(userId:any) {
        
        try{
            const deletedUser = await User.findByIdAndDelete(userId)
            return deletedUser
        }
        catch(error){
            throw error
        }
    }

    async LoggedIn(){
        
        try {
            let token = cookieParser.cookies.accesstoken;
            if(!token){
                throw "Prosze się zalogować"
            }
            let verified = jwt.verify(token, secret)
            if (!verified) {
                throw "Autoryzacja odrzucona!"
            }
            console.log(verified.id)
            return verified
        } catch {
        throw "Proszę się zalogować"
        }

    }
}