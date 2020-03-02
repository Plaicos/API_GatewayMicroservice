module.exports = class API {
    constructor(dependencies) {
        if (!dependencies) {
            console.log("GRPC API FACTORY ERROR: NO DEPENDENCIES, ABORTING PROCESS...")
            process.abort()
        }

        this.dependencies = dependencies
        this.NotifierController = require("../../../../../src/app/Controller/GRPC/Notifier/NotifierController")
    }

    build() {
        let { dependencies, NotifierController } = this
        NotifierController = new NotifierController(dependencies)

        let api = {
            //Notifier
            notify_user: NotifierController.notify_user()
        }
        return Object.freeze(api)
    }

}