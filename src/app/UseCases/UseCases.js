module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

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
        catch(erro) {
            throw (erro)
        }
    }
    
}