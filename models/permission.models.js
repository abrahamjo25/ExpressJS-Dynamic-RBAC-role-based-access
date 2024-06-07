import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    route:{
        type:String,
        required:true
    },
    method :{
        type:String,
        required:true
    }
},{timestamps:true});

const Permission = mongoose.model("Permission",permissionSchema);

export default Permission;