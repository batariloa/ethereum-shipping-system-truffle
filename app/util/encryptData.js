const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

const initVector = crypto.randomBytes(16);

const encrypt = (message) => {
    
   // generate 16 bytes of random data


// protected data
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, process.env.DATA_SECRET, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

return encryptedData;
};

const decrypt = (encryptedData) => {
// the decipher function
const decipher = crypto.createDecipheriv(algorithm, process.env.DATA_SECRET, initVector);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

return decryptedData;
};

module.exports = {
    encrypt,
    decrypt
};