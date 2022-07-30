const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    warrantyTime: {
        type: Number,
        required: true
    },
    soulbound: {
        type: Boolean,
        required: true
    },
    contractAddress: {
        type: String, 
        unique: true
    },
    users: [{type: mongoose.Types.ObjectId, ref:'user'}]
},{
    timestamps: true
})

module.exports = mongoose.model('product', productSchema);
