const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum 8 characters']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    age: {
        type: Number
    },
    photo:{
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    createdAt: {
        type: Date,
        //default: Date.now
    }
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


UserSchema.methods.comparePassword = async function(passwordBody, passwordDB){
    return await bcrypt.compare(passwordBody, passwordDB);
};

UserSchema.methods.isPasswordChanged = async function(jwtTimeStamp){
    if(this.passwordChangedAt){
        const passwordChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
        return jwtTimeStamp < passwordChangedTimestamp
    }

    return false 
}

UserSchema.methods.createNewPasswordToken = async function(){
    this.passwordResetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 min
    return this.passwordResetToken;
}


module.exports = mongoose.model('movieUsers', UserSchema);