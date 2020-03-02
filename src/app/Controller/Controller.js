module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))(dependencies)
    }

    handle_error(erro, resp) {
        console.log(erro)
        resp.status(500)
        resp.json(erro)
        resp.end()
    }

    get_public_static_file() {
        var self = this
        return async function (req, resp) {
            let path = req.path
            path = path.replace("/public", "")
            console.log("Path requested public ", path)
            try {
                let file = await self.UseCases.get_public_static_file(path)
                console.log({ file })
                resp.status(200)
                resp.send(file.data)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }
}