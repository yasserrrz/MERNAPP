import { commentModel } from "../DB/models/comment.model.js";
import { likeModel } from "../DB/models/like.model.js";
import { postModel } from "../DB/models/post.model.js";
import { userModel } from "../DB/models/user.model.js";



export const  addPost = async ( req , res)=>{
    try {
       let {id ,text   }  = req.body;
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        let image ='';
        if (req.file) {
            image = req.file.filename; // Assign the filename to image if a file was uploaded
        }
        const post = new postModel({user : id , text , image});
        const savedPost = await post.save() ;
        const allPosts = await postModel.find();
        res.json({message : 'success' , posts:allPosts})

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}



// export const  getUserPosts = async ( req , res)=>{
//     try {
//        const {userId}  = req.params;
//         const user = await userModel.findById(userId)
//         if(!user){
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const posts = await postModel.find({user:userId}).populate({
//             path: 'comments',
            
//         }).populate({
//             path: "likes",
//             select: 'user',
//             populate: {
//                 path: 'user',
//                 select: 'firstName lastName picture location occupation _id'
//             }
//         });

//         return res.status(200).json({message: 'done'  , posts})

//     } catch (error) {
//         res.status(404).json({message : error.message})
//     }
// }

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const posts = await postModel.find({ user: userId }).populate({
            path: 'comments'
        }).populate({
            path: 'likes',
            populate: {
                path: 'user',
                select: 'firstName lastName picture location occupation _id'
            }
        });
        posts.forEach(post => {
            if(post.image){
                post.image =  process.env.IMAGE_BASE_URL + post.image;
            }
        });

        return res.status(200).json({ message: 'done', posts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



// export const  getFeedPosts = async ( req , res)=>{
//     try {
//         const allPosts = await postModel.find()
//             .populate({ path: "comments" })
//             .populate({
//                 path: 'user',
//                 select: 'firstName lastName picture location occupation _id'
//             }).populate({ path: "likes", select: 'user', populate: { path: 'user', select: 'firstName lastName picture location occupation _id' } });
//         console.log('getFeedPosts allPosts', allPosts);

//         // Log the likes for each post
//         allPosts.forEach(post => {
//             console.log(`Likes for post ${post._id}:`, post.likes);
//         });

//         res.json({ message: 'success', posts: allPosts });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await postModel.find().populate({
            path: 'comments'
        }).populate({
            path: 'user',
            select: 'firstName lastName picture location occupation _id'
        }).populate({
            path: 'likes',
            populate: {
                path: 'user',
                select: 'firstName lastName picture location occupation _id'
            }
        });
        
        
        // Log the likes for each post
        allPosts.forEach(post => {
            if(post.image){
                post.image =  process.env.IMAGE_BASE_URL + post.image;
            }
        });
        
        console.log('getFeedPosts allPosts', allPosts);
        res.json({ message: 'success', posts: allPosts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const  toggleLikePost = async ( req , res)=>{
    try {
       const {userId ,postId}  = req.params;
        const post = await postModel.findById(postId)
        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        const userlike = await likeModel.findOne({ post: postId, user: userId });
        if(userlike){
            await likeModel.deleteOne({ post: postId, user: userId });
            const likeIndex = post.likes.indexOf(userlike._id) ; 
            post.likes.splice(likeIndex);
            post.save();
            return res.status(200).json({message: 'like Deleted' ,  likes : likeList.length  })
        }else{
            const newlike = new likeModel({user:userId ,post: postId })
            const like = await newlike.save() ; 
            post.likes.push(like._id) ; 
            post.save();
            const likeList = await likeModel.find({post : postId})
           return res.status(200).json({message: 'done' ,  likes : likeList.length  })
        }
        

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const  addComment = async ( req , res)=>{
    try {
       const {userId ,postId , text}  = req.body;
       
        const post = await postModel.findById(postId)
        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
         const newComment = new commentModel({user:userId ,post: postId , text})
         const comment = await newComment.save() ; 
         console.log('comment just added', comment)
         post.comments.push(comment._id)
         post.save()
         const commentsList = await commentModel.find({post : postId}).populate({
            path:'user',
            select:'firstName lastName picture location occupation'
         })
        
        return res.status(200).json({message: 'done' ,  comments : commentsList   })

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

