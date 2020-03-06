module.exports = class PagesController {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../../../UseCases/UseCases"))(dependencies)
    }

    view_static_public_page(page_name) {
        var self = this
        return async function (req, resp) {
            let pageSelector = {
                lib: "public",
                subject: "page",
                name: page_name
            }

            try {
                let page = await self.UseCases.get_view(pageSelector, null, null)
                resp.status(200)
                resp.send(page)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

    view_private_page(lib, name) {
        var self = this
        return async function (req, resp) {
            let credential = req.credential
            let pageSelector = {}

            if (credential) {
                pageSelector = {
                    lib: lib,
                    subject: "page",
                    name: name
                }
            }
            else {
                pageSelector = {
                    lib: "public",
                    subject: "page",
                    name: "login"
                }
            }

            try {
                let page = await self.UseCases.get_view(pageSelector, null, credential)
                resp.status(200)
                resp.send(page)
                resp.end()
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

    handle_error(erro, resp) {
        console.log(erro)
        resp.status(500)
        resp.json(erro)
        resp.end()
    }

    handle404() {
        var self = this
        return async function (req, resp) {
            let pageSelector = {
                lib: "public",
                subject: "page",
                name: "404"
            }

            try {
                let page = await self.UseCases.get_view(pageSelector, null, null)
                resp.status(404)
                resp.send(page)
                resp.end()
                console.log("404")
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }
}