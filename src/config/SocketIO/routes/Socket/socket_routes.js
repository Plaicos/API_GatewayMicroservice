module.exports = (socket, dependencies)=> {
    var Controller = new (require("../../../../app/Controller/SocketIO/WSController"))(dependencies)

    socket.on("log in by token", Controller.log_in_byToken(socket))
    socket.on("disconnect", Controller.handle_disconnection(socket))
}