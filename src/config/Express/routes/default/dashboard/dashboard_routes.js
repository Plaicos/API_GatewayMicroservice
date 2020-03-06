module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let Controller = new (require("../../../../../app/Controller/Express/PagesController/PagesController"))(dependencies)

    router.get("/", Controller.view_private_page("dashboard", "dashboard"))

    return router;
}