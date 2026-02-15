import mongoose from "mongoose";

interface User {
    name?: string,
    email: string,
    password ?: string,
    image?: string,
    createdAt ?: Date,
    updatedAt ?: Date
};

const userSchema = new mongoose.Schema<User>({
    name:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        unique : true,
        required : true,
    },
    password:{
        type : String,
        required : false,
    },
    image :{
        type: String,
    },
    
},{timestamps : true})

const User =  mongoose.models.User || mongoose.model('User', userSchema);

export default User;