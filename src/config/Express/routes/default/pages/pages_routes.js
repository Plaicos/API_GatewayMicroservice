module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let Controller = new (require("../../../../../app/Controller/Express/PagesController/PagesController"))(dependencies)

    router.use(/^\/$/, Controller.view_static_public_page("home"))
    router.use("/home", Controller.view_static_public_page("home"))
    router.use("/sign-up", Controller.view_static_public_page("sign_up"))

    //router.use(Controller.handle404())

    return router;
}