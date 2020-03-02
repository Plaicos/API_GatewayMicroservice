var express = require("express")
var app = express()
var newrouter = () => { return express.Router() }
var server_config = require("./config")
var routes = require("./routes/routes")

function startServer(dependencies) {
    try {
        app.use("/public", express.static("./src/app/static/public"))
        //routes config
        app.use(routes(newrouter, dependencies))

        var server = app.listen(server_config.port, server_config.hostname, server_config.callback)
        return server
    }
    catch (erro) {
        throw ("Error initializing Express Server, aborting...", erro)
        process.abort()
    }
}

module.exports = {
    startServer
}