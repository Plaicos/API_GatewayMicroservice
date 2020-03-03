var io = require("socket.io")
var routes = require("./routes/IO/io_routes")

function init(http_server, dependencies) {
    io = io(http_server)
    routes(io, dependencies)
    console.log("Socket IO Server Atached and running")
    // makes io globally available in the Web Sockets Interface
    dependencies.WSI.config(io)

    return;
}

module.exports = {
    init
}