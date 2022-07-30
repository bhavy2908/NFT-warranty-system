const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    product: {type: mongoose.Types.ObjectId, ref:'product'},
    phoneNo: { type: Number, required: true},
    emailId: { type: String, required:true, trim: true},
    modelNo: { type: String, required: true, unique: true},
    contractAddress: String,
    address: String,
    ExpiryDate: Date, 
    tokenId: { type: Number, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema);