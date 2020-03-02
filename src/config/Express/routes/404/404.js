module.exports = (dependencies) => {
    let Controller = new (require("../../../../app/Controller/Express/PagesController/PagesController"))(dependencies)
    return Controller.handle404();
}