module.exports = class ViewInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    get_template(selector, params, credential) {
        return new Promise((resolve, reject) => {
            let { Interface } = this

            try {
                Interface.View.get_template({ selector, params, credential }, (erro, template) => {
                    if (erro) {
                        throw (Error(erro))
                    }
                    console.log("resolving api call to view service")
                    resolve(template);
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_static_file(){
        return new Promise((resolve, reject)=>{
            
        })
    }
}