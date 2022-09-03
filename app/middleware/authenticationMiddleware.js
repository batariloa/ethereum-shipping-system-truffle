const CustomError = require('../error')
const {isTokenValid, attachCookiesToResponse} = require('../util')
const Token = require('../model/Token')


const authenticateUser = async(req,res,next) =>{

//take tokens from 
const {refreshToken, accessToken} = req.signedCookies

    
try{
console.log('Access token: ', accessToken)
console.log('REFF token: ', refreshToken)

    
//in case access token is valid
if(accessToken){
    const payload = isTokenValid(accessToken)



    console.log("PAYLOAD IS ", payload)
    //extract user data from token
    req.user = payload.user


    return next();
}

console.log('getting here')


//in case access token is not valid, check refresh token
const payload = isTokenValid(refreshToken)
console.log('lets see', payload.user.id, payload.refreshToken, payload)

const existingToken = await Token.findOne({
    user:payload.user.id,
})
console.log('getting here 2')


if(!existingToken || !existingToken?.isValid){
    throw new CustomError.UnauthenticatedError('Authentication invalid  2')
}
console.log('getting here 3 ')

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user   

} catch(error){
    console.log('error ', error)
    throw new CustomError.UnauthenticatedError('Invalid authentication')
}


}

const authorizePermissions = (...roles) =>{

return (req,res,next)=>{

console.log('Roles included in req.user: ', req.user.role)
if(!roles.includes(req.user.role)){
    throw new CustomError.UnauthorizedError('No permission to access this route')
}

next();
}}
  

module.exports = {
    authenticateUser,
    authorizePermissions
}