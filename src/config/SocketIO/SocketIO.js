var io = require("socket.io")
var routes = require("./routes/IO/io_routes")

function init(http_server, dependencies) {
    io = io(http_server)
    routes(io, dependencies)

    return;
}

module.exports = {
    init
}