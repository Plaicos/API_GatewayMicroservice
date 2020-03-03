module.exports = class WebSocketsController {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { SCI } = dependencies
        this.SCI = SCI
        this.UseCases = new (require("../../UseCases/UseCases"))(dependencies)
    }

    handle_connection() {
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
        var { UseCases } = this
        return async function (reason) {
            try {
                if (socket.credential) {
                    await UseCases.delete_connection(socket.id)
                }
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

    log_in_byToken(socket) {
        var { SCI, UseCases } = this
        return async function (token) {
            if (!token) {
                return self.handle_error("Token must be a valid string")
            }

            try {
                let credential = await SCI.Authenticator.authenticate(token)
                socket.credential = credential
                socket.emit("logged in")
                console.log({ credential })
                await UseCases.store_connection(credential.user, socket.id)
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