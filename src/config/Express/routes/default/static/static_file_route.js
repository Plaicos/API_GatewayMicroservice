module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let Controller = new (require("../../../../../app/Controller/Controller"))(dependencies)

    router.use(Controller.get_public_static_file())

    return router;
}