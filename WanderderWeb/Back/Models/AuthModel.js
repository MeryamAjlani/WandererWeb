const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required:true,
    },
    
});
AuthSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next()
    } catch (error) {
        next(error)
    }
})


AuthSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}
const Auth = mongoose.model('auth', AuthSchema);
module.exports = Auth;