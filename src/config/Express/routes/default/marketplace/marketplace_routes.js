module.exports = (newrouter, dependencies) => {
    let Controller = new (require("../../../../../app/Controller/Express/PagesController/PagesController"))(dependencies)
    let router = newrouter()

    router.get("/", Controller.view_private_page("marketplace", "marketplace"))

    return router;
}