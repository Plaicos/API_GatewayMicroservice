module.exports = class NotifierController {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../../../UseCases/UseCases"))(dependencies)
    }

    handle_error(error, callback) {
        console.log(error)
        callback(Error(error))
    }

    notify_user() {
        var self = this
        return async function (call, callback) {
            console.log("Called me")
            let { credential, user, notification } = call.request
            let user_conencted = false

            try {
                user_conencted = await self.UseCases.check_if_user_has_conenction(user, credential)

                if (user_conencted) {
                    let user_conenctions = await self.UseCases.get_user_connections(user)
                    console.log({ user_conenctions })
                    for (let connection of user_conenctions) {
                        await self.UseCases.notify_user(connection, notification)
                    }
                    return callback(null, { status: "ok" })
                }
                else {
                    throw ("User does that have any active connections")
                }
            }
            catch (erro) {
                self.handle_error(erro, callback)
            }
        }
    }
}