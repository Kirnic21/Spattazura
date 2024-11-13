const userList = [
    { name: "Edmilson" },
    { name:"Abaete"},
  ];
exports.userList = (req,res,next)=>{
    res.render("index",{users: userList} )
}
exports.userCreateGet = (req,res,next)=>{
    res.render("create")
}
exports.userCreatePost = (req,res,next)=>{
  userList.push({name:req.body.name})
  console.log(userList)
  res.redirect("/")
}

exports.userUpdateGet = (req,res,next)=>{
    
    console.log("WIP")
}
exports.userUpdatePost = (req,res,next)=>{
    console.log("WIP")

}

exports.userDeletePost = (req,res) =>{
    console.log("WIP")
    
}