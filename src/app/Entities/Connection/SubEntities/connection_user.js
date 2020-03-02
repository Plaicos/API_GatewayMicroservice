module.exports = async ({ user, SCI }) => {
    if(!user || typeof user !== "string"){
        throw("Connection user must be a valid string")
    }

    try{
        await SCI.User.check_user(user)
        return user
    }
    catch(erro){
        throw(erro)
    }
}