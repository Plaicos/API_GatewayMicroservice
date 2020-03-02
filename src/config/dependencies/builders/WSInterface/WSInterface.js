module.exports = class WebSocketsInterface {
    constructor() {

    }

    async build() {
        let WSI = {}

        try {
            WSI.config = this.config(WSI)
            WSI.notify = this.notify(WSI)
            return WSI;
        }
        catch (erro) {
            throw (erro)
        }
    }

    config(WSI) {
        return function (io) {
            WSI.io = io
            return
        }
    }

    notify(WSI) {
        return async function (connection_id, notification) {
            let io = WSI.io
            if (!io) {
                throw ("WSI not configured")
            }
            if (!connection_id || typeof connection_id !== "string") {
                throw ("Connection id must be a valid string")
            }

            try {
                let socket = io.sockets.connected[connection_id]
                console.log(Object.keys(io.sockets.connected))
                //socket.emit("notification", notification)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }
}