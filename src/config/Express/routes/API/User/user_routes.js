module.exports = (newrouter, dependencies) => {
    let Controller = new (require("../../../../../app/Controller/Express/APIController/UserController/UserController"))(dependencies)
    let router = newrouter()

    router.post("/log-in", Controller.log_in())
    router.post("/sign-up", Controller.sign_up())
    router.get("/user-data", Controller.get_user())

    return router;
}