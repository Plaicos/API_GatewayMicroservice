module.exports = class WebSocketsController {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../../UseCases/UseCases"))(dependencies)
    }

    handle_connection(io) {
        var self = this
        var socket_routes = require("../../../config/SocketIO/routes/Socket/socket_routes")
        return async function (socket) {
            if (!socket) {
                throw ("Empity socket, cant connect! Please try again")
            }

            try {
                socket.emit("alert", "Connection established, please log in...")
                socket_routes(socket, self.dependencies)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }

    handle_disconnection(socket) {
        var self = this
        var socket_routes = require("../../../config/SocketIO/routes/Socket/socket_routes")
        return async function (reason) {
            try {
                console.log("socket disconnected", socket.id)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }

    handle_error(error, socket) {
        console.log({ socket })
        socket.emit("erro", error)
        console.log(error)
        return
    }

    log_in(socket) {
        var self = this
        return async function (login, password) {
            if (!login || typeof login !== "string") {
                return self.handle_error("Login must be a valid string")
            }
            if (!password || typeof password !== "string") {
                return self.handle_error("Password must be a valid string")
            }

            try {
                let credential = await self.UseCases.authenticate_token(token)
                socket.emit("logged in", credential)
                socket.credential = credential
                return
            }
            catch (erro) {
                self.handle_error(erro, socket)
            }
        }
    }

    log_in_byToken(socket) {
        var self = this
        return async function (token) {
            if (!token) {
                return self.handle_error("Token must be a valid string", socket)
            }

            try {
                let credential = await self.UseCases.authenticate_token(token)
                socket.credential = credential
                socket.emit("logged in")
                await self.UseCases.store_connection(credential.user, socket.id)
                return
            }
            catch (erro) {
                self.handle_error(erro, socket)
            }
        }
    }

    handle_reconnect(socket) {
        var self = this
        var socket_routes = require("../../../config/SocketIO/routes/Socket/socket_routes")
        return async function (attempts) {
            if (!socket) {
                throw ("Empity socket, cant reconnect! Please try again")
            }

            try {
                // socket.emit("alert", "Connection established")
                // socket_routes(socket, self.dependencies)
                console.log("RECONNECTED SOCKET: ", socket)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }
}