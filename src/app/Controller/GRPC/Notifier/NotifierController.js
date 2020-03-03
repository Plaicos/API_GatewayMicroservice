module.exports = class NotifierController {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { SCI } = dependencies
        this.SCI = SCI
        this.UseCases = new (require("../../../UseCases/UseCases"))(dependencies)
    }

    handle_error(error, callback) {
        console.log(error)
        callback(Error(error))
    }

    notify_user() {
        var { SCI, UseCases } = this
        return async function (call, callback) {

            let { credential, user, notification } = call.request
            let user_conencted = false

            try {
                user_conencted = await UseCases.check_if_user_has_conenction(user, credential)

                if (user_conencted) {
                    let user_conenctions = await UseCases.get_user_connections(user)

                    for (let connection of user_conenctions) {
                        await UseCases.notify_user(connection, notification)
                    }
                    return callback(null, { status: "ok" })
                }
                else {
                    console.log("User has no connection")
                    throw ("User does that have any active connections")
                }
            }
            catch (erro) {
                self.handle_error(erro, callback)
            }
        }
    }
}