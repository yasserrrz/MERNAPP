


import express from 'express'
import {addComment, getFeedPosts , getUserPosts , toggleLikePost} from '../controllers/post.js'
import { authorize } from '../middleware/auth.middleware.js';


const router  = express.Router();

router.get('/' , authorize , getFeedPosts ); 
router.get('/:userId/post' , authorize , getUserPosts );
router.patch('/:userId/:postId/like' , authorize , toggleLikePost)  // post id
router.post("/comment" , authorize , addComment)
export default router