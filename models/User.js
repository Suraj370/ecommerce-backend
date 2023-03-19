const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username must be provided'],
        unique: true,
        index:true,
       
    },
    email:{
        type:String,
        required: [true, 'Email must be provided'],
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        } 
    },
 
    password:{
        type:String,
        required:[true, 'Password must be provided'],
    },
},{timestamps: true}
);



userSchema.pre('save', async function(next){
    if(!this.isModified('password'))next()
    this.password = await bcrypt.hash(this.password, 10)
    return next()

})



userSchema.methods.checkPassword = async function(password){
    const result = bcrypt.compare(password, this.password)
    return result
}

//Export the model

const User = mongoose.model('User', userSchema);
module.exports = User