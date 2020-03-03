module.exports = (newrouter, dependencies) => {
    let Controller = new (require("../../../../../app/Controller/Express/APIController/UserController/UserController"))(dependencies)
    let router = newrouter()

    router.use("/log-in", Controller.log_in())
    router.use("/sign-up", Controller.sign_up())

    return router;
}