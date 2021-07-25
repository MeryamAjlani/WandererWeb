const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({

    code:{
        type :String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: { expires: 60 }
      }
   
});
const Code = mongoose.model('code', CodeSchema);
module.exports = Code;

