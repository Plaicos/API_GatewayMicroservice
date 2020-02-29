function initialize(dependencies) {
    let serverBuilder = require("./Server/ServerBuilder").build
    let serviceFactory = new (require("./Server/Service/ServiceFactory"))
    let apiBuilder = require("./Server/API/API")

    let service = serviceFactory.makeService()
    let api = new apiBuilder(dependencies).build()
    let server = serverBuilder(service, api)

    server.start()
    console.log("GRPC MARKETPLACE SERVER RUNNING")
    return
}

function exportClient() {
    try {
        let Client = new (require("./Client/clientBuilder"))().build()
        return Client
    }
    catch (erro) {
        console.log(Error("FATAL GRPC CLIENT ERROR, ABORTING..." + erro))
        process.abort()
    }
}

module.exports = {
    initialize,
    exportClient
}