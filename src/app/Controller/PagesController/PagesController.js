module.exports = class PagesController {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../../UseCases/UseCases"))(dependencies)
    }

    view_static_public_page(page_name){
        var self = this
        return async function(req, resp){
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
            catch (erro){
                self.handle_error(erro, resp)
            }
        }
    }

    handle_error(erro, resp){
        console.log(erro)
        resp.status(500)
        resp.json(erro)
        resp.end()
    }

    handle404(){
        return async function(req, resp){
            resp.status(404)
            resp.json({message: "Foo and Bar"})
            resp.end()
        }
    }
}