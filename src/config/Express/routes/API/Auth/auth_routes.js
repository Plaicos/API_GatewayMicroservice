module.exports = (newrouter, dependencies) => {
    let Controller = new (require("../../../../../app/Controller/Express/APIController/AuthController/AuthController"))(dependencies)
    let router = newrouter()

    router.use("/gen-token", Controller.generateToken())

    return router;
}