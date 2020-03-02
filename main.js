async function init_application() {
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()
    var Express = require("./src/config/Express/Express")
    var SocketIO = require("./src/config/SocketIO/SocketIO")
    var GRPC = require("./src/config/GRPC/GRPC")

    let http_server = Express.startServer(dependencies)
    SocketIO.init(http_server, dependencies)
    GRPC.init(dependencies)
}

init_application()