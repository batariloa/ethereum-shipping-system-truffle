const AesEncryption = require('aes-encryption')

const aes = new AesEncryption()
aes.setSecretKey(process.env.DATA_SECRET)
// Note: secretKey must be 64 length of only valid HEX characters, 0-9, A, B, C, D, E and F



const encrypt = (message) => {


return aes.encrypt(message)
};

const decrypt = (encryptedData) => {

return aes.decrypt(encryptedData)

};

module.exports = {
    encrypt,
    decrypt
};