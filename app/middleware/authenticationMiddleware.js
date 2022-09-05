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

//find token in database
const existingToken = await Token.findOne({
    user:payload.user.id,
    refreshToken: payload.refreshToken
})

//if refresh token doesnt 

if(!existingToken || !existingToken?.isValid){
    throw new CustomError.UnauthenticatedError('Authentication invalid  2')
}
console.log('getting here 3 ')

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

console.log('getting here 4 ')

    req.user = payload.user   
   next();
} catch(error){
    console.log('error ', error)
    throw new CustomError.UnauthenticatedError('Invalid authentication')
}
console.log('getting here 5 ', req.user.role)


}


const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };

  }
  
  

module.exports = {
    authenticateUser,
    authorizePermissions
}