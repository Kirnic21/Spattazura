exports.userList = async (req, res, next) => {
    const users = await db.getAllUsers()
    console.log("Users",users)

     await res.render("userList", { users }); 
};
exports.userDetalhes = (req,res,next)=>{
res.render("user")
}
exports.userCreateGet = (req,res,next) =>{
res.render("userCreate")
}
exports.userCreatePost = async (req,res,next)=>{
console.log(req.body)
const {user,raca,peso} = req.body

await db.insertUser(user,raca,peso)
res.redirect("/user")
}
exports.userSearchGet = async (req,res,next)=>{
   const searchQuery = req.query.nome;
    if(searchQuery){
        users = await db.searchUser(searchQUery)
    }
}
exports.userUpdateGet = async (req,res,next)=>{
const user = await db.getUser(req.params.id)
console.log(user.rows[0])
if (!user) {
    return res.status(404).send("User not found");
}
res.render("userUpdate", { user:user.rows[0] });
}

exports.userUpdatePost = async (req, res, next) => {

try {
    const { user } = req.body;
    // Update the user with the provided id

    await db.updateUser(user, raca, peso, req.params.id); 


    // Fetch the updated user data after the update
    const updatedUser = await db.getUser(req.params.id);
    console.log(updatedUser.rows[0]); // Log the updated user details

    res.redirect("/user");
} catch (error) {
    console.error("Error updating user:", error);
    next(error); // Pass error to the next middleware
}
};
exports.userDelete = async (req,res,next)=>{
const {user } = req.body;
await db.deleteUser(req.params.nome)
res.redirect("/")
}