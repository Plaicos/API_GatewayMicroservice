module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI, WSI } = dependencies

        this.WSI = WSI
        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    async get_view(selector, params, credential) {
        let { SCI } = this

        try {
            let template = await SCI.View.get_template(selector, params, credential)
            return template.html;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async get_public_static_file(path) {
        let { SCI } = this

        try {
            let file = await SCI.View.get_public_static_file(path)
            // file is a binary buffer array
            if (file.type === "Buffer") {
                file = Buffer.from(file.data)
            }
            return file.toString("binary");
        }
        catch (erro) {
            console.log("Error getting the file from the view service", erro)
            throw (erro)
        }
    }

    async authenticate_token(token) {
        let { SCI } = this

        if (!token || typeof token !== "string") {
            throw ("The Token must be a valid string")
        }

        try {
            let credential = await SCI.Authenticator.authenticate(token)
            return credential;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async generate_token(user) {
        let { SCI } = this

        if (!user || typeof user !== "string") {
            throw ("The user must be a valid string")
        }

        try {
            let token = await SCI.Authenticator.generateToken(user)
            return token;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async store_connection(user, id) {
        let { entities, DAO, SCI } = this

        try {
            let ConnectionExists = await DAO.check_connection(id)
            console.log({ ConnectionExists })
            if (ConnectionExists) {
                return "Connection already exists";
            }
            else {
                let Connention = await new entities.Connection({ data: { user, id }, SCI, DAO }).build()
                await Connention.register()
            }

            return
        }
        catch (erro) {
            throw (erro)
        }
    }

    async check_if_user_has_conenction(user, credential) {
        let { entities, DAO, SCI } = this
        let user_has_connection = false

        try {
            user_has_connection = await DAO.check_if_user_has_connection(user)
            return user_has_connection;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async get_user_connections(user) {
        if (!user || typeof user !== "string") {
            throw ("User must be a valid string")
        }

        let { DAO } = this

        try {
            let connections = await DAO.get_user_connections(user)
            return connections;
        }
        catch (erro) {
            throw (erro)
        }
    }

    async notify_user(connection, notification) {
        let { WSI } = this
        console.log({ connection, notification })

        try {
            await WSI.notify(connection, notification)
            return
        }
        catch (erro) {
            throw (erro)
        }
    }

    async delete_connection(id) {
        let { SCI, DAO, entities } = this

        try {
            let Connection = await new entities.Connection({ data: { id: id }, DAO, SCI }).load()
            await Connection.delete()
            return
        }
        catch (erro) {
            throw (erro)
        }
    }
}