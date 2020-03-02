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

    
}