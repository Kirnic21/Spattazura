const { Router } = require("express");
const userController = require("../controller/userController");
const userRouter = Router();
userRouter.get("/",userController.userList)
userRouter.get("/create",userController.userCreateGet)
userRouter.get("/search",userController.userSearchGet)
userRouter.post("/search",userController.userSearchGet)
userRouter.post("/create",userController.userCreatePost)
userRouter.get("/:id/update",userController.userUpdateGet)
userRouter.post("/:id/update",userController.userCreatePost)
userRouter.post("/:id/delete",userController.userDeletePost)   
module.exports= userRouter;