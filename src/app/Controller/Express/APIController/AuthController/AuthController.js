module.exports = class AuthenticationController {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { SCI } = dependencies
        this.SCI = SCI
        this.UseCases = new (require("../../../../UseCases/UseCases"))(dependencies)
    }

    handle_error(error, resp) {
        resp.status(500)
        if (error) {
            resp.json(error)
            console.log(error)
        }
        resp.end()
    }

    generateToken() {
        var self = this
        return async function (req, resp) {
            let user = req.query.user

            try {
                let token = await self.SCI.Authenticator.generateToken(user)
                resp.json(token)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }
}