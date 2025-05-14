const { createUserService, Login } = require("../services/user.Service");


const createUser =async (req,res) =>{
    const {name, email, password} = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data)
}

const login =async (req,res) =>{
    const { email, password} = req.body;
    const data = await Login( email, password);
    return res.status(200).json(data)
}
module.exports = {
    login,
createUser
}