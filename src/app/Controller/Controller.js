module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../Use_Cases/UseCases"))(dependencies)
    }

    get_static_file(selector)
}