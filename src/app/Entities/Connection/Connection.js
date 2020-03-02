module.exports = class Connection {
    constructor({ data, SCI, DAO }) {
        this.SCI = SCI
        this.DAO = DAO
        this.data = data
        this.entities = require("./SubEntities/entities")
    }

    async build() {
        let { SCI, entities, data } = this
        let Connection = new Object()

        if (!data || typeof data !== "object") {
            throw ("Connection data must be a valid object")
        }

        let { user, id } = data
        console.log({ data })
        try {
            Connection.user = await entities.user({ user, SCI })
            Connection.id = await entities.id(id)
            Connection = this.methods(Connection)
            return Connection;
        }
        catch (erro) {
            throw (erro)
        }
    }

    methods(Connection) {
        Connection.__proto__.register = this.register()
        Connection.__proto__.delete = this.delete()
        return Connection;
    }

    register() {
        var { DAO } = this
        return async function () {
            try {
                await DAO.register_connection(this)
                return;
            }
            catch (erro) {
                throw (erro)
            }
        }
    }

    update() {
        var { DAO } = this
        return async function () {
            try {
                await DAO.update_connection(this.id, this)
                return;
            }
            catch (erro) {
                throw (erro)
            }
        }
    }

    async load() {
        var { DAO, data } = this

        if (!data || typeof data !== "object") {
            throw ("Connection data must be a valid object")
        }

        let { id } = data

        try {
            let Connection = await DAO.get_connection(id)
            Connection = this.methods(Connection)
            return Connection;
        }
        catch (erro) {
            throw (erro)
        }
    }

    delete() {
        var self = this
        return async function () {
            let { DAO } = self
            let id = this.id

            try {
                await DAO.delete_connection(id)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }
}