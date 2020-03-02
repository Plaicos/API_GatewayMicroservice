module.exports = (io, dependencies) => {
    var Controller = new (require("../../../../app/Controller/SocketIO/WSController"))(dependencies)

    io.on("connection", Controller.handle_connection(io))
}