const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/LoginDemo',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useUnifiedTopology:false
})

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

//useful function
userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= bcrypt.hashSync(this.password,12)
    next()
})

userSchema.methods.comparePassword = function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password))
}

const userModel = mongoose.model("loginusers",userSchema)

module.exports =userModel