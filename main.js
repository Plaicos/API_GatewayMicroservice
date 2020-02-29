async function init_application() {
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()
    var Express = require("./src/config/Express/Express")
    Express.startServer(dependencies)
}

init_application()