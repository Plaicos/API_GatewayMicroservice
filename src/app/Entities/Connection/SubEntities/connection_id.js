module.exports = async (id) => {
    if(!id || typeof id !== "string"){
        throw("Connection id must be a valid string")
    }

   return id;
}