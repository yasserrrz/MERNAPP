

import express from 'express'
import {getUser , getUserFriends , addRemoveFriend} from '../controllers/users.js'
import { authorize } from '../middleware/auth.middleware.js';
const router = express.Router();


router.get('/:id' , authorize ,getUser)
router.get('/:id/friends' , authorize ,getUserFriends)
router.patch('/:id/:friendId' , authorize ,addRemoveFriend)




export default router