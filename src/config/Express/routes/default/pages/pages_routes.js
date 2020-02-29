module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let Controller = new (require("../../../../../app/Controller/PagesController/PagesController"))(dependencies)

    router.use("/home", Controller.view_static_public_page("home"))

    return router;
}