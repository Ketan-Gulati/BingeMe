import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema =  new mongoose.Schema({
    videoFile : {
        type:String,  // cloudinary url
        required:true
    },
    thumbnail : {
        type:String,  // cloudinary url
        required:true
    },
    title : {
        type:String,  
        required:true
    },
    description : {
        type:String,  
        required:true
    },
    owner : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    duration : {
        type:Number,    //cloudinary
        required:true
    },
    views : {
        type:Number,
        default:0
    },
    isPublished : {
        type:Boolean,
        default:true
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video =  mongoose.model("Video",videoSchema)