module.exports = class MarketplaceController {
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

    post() {
        var self = this
        return async function (req, resp) {
            let data = req.body
            let credential = req.credential

            try {
                await self.SCI.Marketplace
            }
            catch (erro) {
                self.handle_error(erro, resp)
            }
        }
    }

}