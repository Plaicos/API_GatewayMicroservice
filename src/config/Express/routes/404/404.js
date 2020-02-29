module.exports = (dependencies) => {
    let Controller = new (require("../../../../app/Controller/PagesController/PagesController"))(dependencies)
    return Controller.handle404();
}