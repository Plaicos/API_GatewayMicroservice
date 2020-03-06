module.exports = class UserController {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { SCI } = dependencies
        this.SCI = SCI
        this.UseCases = new (require("../../../../UseCases/UseCases"))(dependencies)
    }

    handle_error(erro, resp) {
        console.log(erro)
        resp.status(500)
        resp.json(erro)
        resp.end()
    }

    sign_up() {
        var self = this
        return async function (req, resp) {
            let data = req.body

            try {
                await self.SCI.User.sign_up(data)
                resp.status(200)
                resp.end()
                return
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

    log_in() {
        var self = this
        return async function (req, resp) {
            let { login, password } = req.body

            try {
                let session = await self.SCI.User.log_in(login, password)
                resp.status(200)
                resp.cookie("PlaicosSession", session.session_data.token, { maxAge: 21600000, sameSite: true })
                resp.json(session)
                resp.end()
                return
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

    get_user() {
        var self = this
        return async function (req, resp) {
            let credential = req.credential
            let user = req.query.user

            try {
                let user_data = await self.SCI.User.get_user(user, credential)
                resp.status(200)
                resp.json(user_data)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

}