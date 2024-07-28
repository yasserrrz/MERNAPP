import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    text :{
        type :String   
    },
    user:{
        type: Types.ObjectId,
        ref:"User", 
        required:true
    },
    image:{
      type:String
    }
  ,
  likes: [{
    type: Types.ObjectId ,
    ref:"Like", 
   // if you want to create a ref in the schema and this schem may be more than object (post contain more than comment and more than like >> To associate multiple ) ypu must make sure the definition is array type [] 

  }]
,
  comments:[ {
    type: Types.ObjectId ,
    ref:"Comment", 
    // required:trueA
  }
]
   
},{timestamps:true});


// postSchema.post("init", function(doc){
//   if(doc.image){
//       doc.image = process.env.IMAGE_BASE_URL + doc.image;
    
//   }
// })


export const postModel = model('Post', postSchema);

