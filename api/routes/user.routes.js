import express from "express"
import test from "../controllers/user.controller.js"
import {verifyToken} from "../utils/verifyUser.js"
import {
    updateUser,
    deleteUser,
    signoutUser,
    getUsers
} from "../controllers/user.controller.js"


const router=express.Router();
router.get('/test',test)
router.post('/signout',signoutUser);
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.get('/getusers',verifyToken,getUsers)

export default router;