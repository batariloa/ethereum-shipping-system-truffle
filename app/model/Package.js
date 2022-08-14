const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');

const PackageSchema = mongoose.Schema({

    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    description: {
        type: String,
        default:'No description'
    },
    toAddress: {
        type: String,
        required:[true,'Please provide shipping address']
    },
    
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,  
  
    },
    shipmentDate: {
        type: String,
        required: true,
        default:  ()=>dateWithouTime()
    }
})

function dateWithouTime() {
    
    return new Date().toLocaleDateString()
}

module.exports = mongoose.model('Package', PackageSchema)