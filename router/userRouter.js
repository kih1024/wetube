import express from "express"
import routes from "../routes"
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);


// function fa (){
//     return true
// };

// fafa = () =>{
//     return true
// };

export default userRouter;
