const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid/v1'); 
const schema = mongoose.Schema;

var userSchema = new schema({

     name :{
         type:String,
         required:true,
         maxlength:30,
         trim:true
     },
     lastname :{
         type:String,
         maxlength:32
     },
     email :{
         type:String,
         trim:true,
         requird:true,
         unique:true
     },
     userinfo:{
        type:String,
        trim:true
     },
     encry_password :{
         type:String,
         required:true
     },
     salt : String,
     role :{
         type:Number,
         default:0
     },
     purchases :{
         type:Array,
         default:[] 
     }

},{timestamps:true})

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt=uuid();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
})

userSchema.method = {
    authenticate : function(plainpassword){
        var encrypass = this.securePassword(plainpassword);
        if(encrypass == this.encry_password){
            return true;
        }else{
            return false;
        }

    },
    securePassword : function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256',this.salt)
                         .update(plainpassword)
                         .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}


module.exports = mongoose.model('User',userSchema);