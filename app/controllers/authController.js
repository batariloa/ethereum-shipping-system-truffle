const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const AllErrors = require('../error')
const jwt = require('jsonwebtoken')

const {createJWT, isTokenValid, attachCookiesToResponse, createTokenUser} =  require('../util')

const register = async (req,res)=>{

console.log('herer')
    const {email,name,password} = req.body;

    if(!email || !name ||!password){
    
    throw new AllErrors.BadRequestError('Please enter all required fields')
    }
console.log('here2r')

    const isFirstAccount = await User.countDocuments({}) === null
    const role = isFirstAccount? 'admin':'user'
console.log('here3r')

    const user = await User.create({name,email,password,role})
    console.log('here is user')
    const userInfo = createTokenUser(user)

    attachCookiesToResponse({res, user:userInfo})

    res.status(StatusCodes.CREATED).json({user})
   
}
const login= async (req,res)=>{

    const {email, password} = req.body

    if(!email || !password){
        throw new AllErrors.BadRequestError('Please provide all credentials')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new AllErrors.UnauthenticatedError('Invalid Credentials')
    }


    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
                throw new AllErrors.UnauthenticatedError('Invalid Credentials')

    }
        const userInfo = createTokenUser(user)
        attachCookiesToResponse({res, user:userInfo})


    res.send('Test')
}
const logout = async (req,res)=>{

        res.cookie('refreshToken', 'logout', {
            httpOnly:true,
            expires: new Date(Date.now())
        })
        res.status(StatusCodes.OK).json({msg:'user logged out'})

}


module.exports = {
    register,
    login,
    logout
}