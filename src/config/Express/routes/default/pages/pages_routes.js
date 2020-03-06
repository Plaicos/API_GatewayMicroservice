module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let Controller = new (require("../../../../../app/Controller/Express/PagesController/PagesController"))(dependencies)

    router.get(/^\/$/, Controller.view_static_public_page("home"))
    router.get("/home", Controller.view_static_public_page("home"))
    router.get(/^\/sign-up$/, Controller.view_static_public_page("sign_up"))
    router.get("/log-in", Controller.view_static_public_page("login"))
    router.get(/^\/sign-up\/supplier$/, Controller.view_static_public_page("sign_up_supplier"))
    router.get(/^\/sign-up\/industry$/, Controller.view_static_public_page("sign_up_industry"))

    //router.use(Controller.handle404())

    return router;
}