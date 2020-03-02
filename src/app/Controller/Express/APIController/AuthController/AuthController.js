module.exports = class AuthenticationController {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../../../../UseCases/UseCases"))(dependencies)
    }

    handle_error(error, resp){
        resp.status(500)
        if(error){
            resp.json(error)
            console.log(error)
        }
        resp.end()
    }

    generateToken() {
        let self = this
        return async function (req, resp) {
            let user = req.query.user

            try {
                let token = await self.UseCases.generate_token(user)
                resp.json(token)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }
}