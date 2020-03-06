module.exports = class UserInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    get_user(login, credential) {
        return new Promise(async (resolve, reject) => {
            this.Interface.User.get_user({ login, credential }, (erro, data) => {
                if (erro) {
                    return reject(erro)
                }

                resolve(data)
            })
        })
    }

    check_user(login) {
        return new Promise(async (resolve, reject) => {
            this.Interface.User.check_user({ login }, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })

    }

    getUserWarehouse({ user, id, credential }) {
        return new Promise(async (resolve, reject) => {
            this.Interface.User.get_user_warehouse({ user, id, credential }, (erro, warehouse) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(warehouse)
            })
        })
    }

    log_in(login, password) {
        return new Promise(async (resolve, reject) => {
            let { Interface } = this

            try {
                Interface.User.log_in({ login, password }, (erro, session) => {
                    if (erro) {
                        return reject(erro)
                    }

                    resolve(session)
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    sign_up(sign_up_data) {
        return new Promise(async (resolve, reject) => {
            let { Interface } = this

            if (typeof sign_up_data !== "object") {
                return reject("Invalid Sign Up Data")
            }

            try {
                Interface.User.sign_up(sign_up_data, (erro, statusResponse) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (statusResponse === "ok") {
                        resolve()
                    }
                    else {
                        reject("Something went wrong in the sign up")
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}