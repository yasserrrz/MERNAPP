import { userModel } from "../DB/models/user.model.js"




export const  getUser = async ( req , res)=>{
    try {
       const {id}  = req.params;
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
       
        return res.status(200).json({message: 'done'  , user:newuser})

    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const  getUserFriends = async( req , res)=>{
    try {
       const {id}  = req.params;
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
      const friends =   await user.populate({   // populate return promise  that resolves to the document after population.
            path:'friends',
            select:'firstName lastName picture location occupation'
        });

        res.status(200).json({message : 'done' , user: friends})
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


// update

export const  addRemoveFriend  = async( req , res)=>{
    try {
        const {id , friendId}  = req.params;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const friendIndex = user.friends.findIndex((friend)=>{
          return  friend === friendId
        })
        if(friendIndex !== -1){
            user.friends.splice(friendIndex , 1);
           await user.save()
           res.status(200).json({ message: 'Friend removed successfully', user });
        }else{
            user.friends.push(friendId);   // add friend to the friends array
            await user.save()
            res.status(200).json({ message: 'Friend Added successfully', user });
        }
    } catch (error) {
        console.error('Error updating friends list:', error);
    res.status(500).json({ message: 'Server error' });
    }
}