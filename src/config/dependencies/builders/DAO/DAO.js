module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            connections: db.collection("connections")
        }
    }

    async register_connection(connection) {
        try {
            let insertionLog = await this.collections.connections.insertOne(connection)
            return insertionLog;
        }
        catch (erro) {
            throw (erro)
        }
    }

    check_connection(id) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collections.connections.find({ id: id }).toArray((erro, result) => {
                    if (erro) {
                        throw (erro)
                    }

                    if (result.length > 0) {
                        resolve(true)
                    }
                    else {
                        resolve(false)
                    }
                })

            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    async update_connection(id, newConnection) {
        try {
            let updateLog = await this.collections.connections.updateOne({ id: id }, newConnection);
            return updateLog;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async get_connection(id) {
        try {
            let connection = await this.collections.connections.find({ id: id }).toArray((erro, result) => {
                if (erro) {
                    throw (erro)
                }

                if (result.length > 0) {
                    return result[0]
                }
                else {
                    throw ("That connection does not exist!")
                }
            })

            return connection;
        }
        catch (erro) {
            throw (erro)
        }
    }

    check_if_user_has_connection(user) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collections.connections.find({ user: user }).project({ _id: -1, user: -1 }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (result.length > 0) {
                        resolve(true)
                    }
                    else {
                        resolve(false)
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_user_connections(user) {
        return new Promise(async (resolve, reject) => {
            try {
                this.collections.connections.find({ user: user }).project({ _id: 0, id: 1 }).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (result.length > 0) {
                        let parsed = []
                        for (let i of result) {
                            parsed.push(i.id)
                        }
                        resolve(parsed)
                    }
                    else {
                        reject("That user has no connections stored")
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    delete_connection(id) {
        return new Promise(async (resolve, reject) => {
            let { collections } = this

            try {
                let deletionLog = await collections.connections.deleteOne({ id: id })
                resolve(deletionLog)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}