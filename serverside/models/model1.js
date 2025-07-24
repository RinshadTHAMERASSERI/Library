import mongoose from "mongoose";

const bookSchema =new mongoose.Schema({

book: {type :String},
  author:{type:String},
  price: {type:Number},
  catogery:{type:String}, 
  pic:{type:String},
  rating:{type:Number}

})
export default mongoose.model.user||mongoose.model('book',bookSchema)