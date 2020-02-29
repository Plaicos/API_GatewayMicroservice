//tools
//cnpj validator browser
function validate_cnpj(cnpj) {
    return new Promise((resolve, reject) => {
        try {
            if (!cnpj)
                reject()
            console.log(cnpj)
            let main_server_link = sessionStorage.getItem("main_server_link")
            fetch(`${main_server_link}/validate-cnpj?cnpj=${cnpj}`, {
                method: "GET"
            })
                .then(json => json.json())
                .then((data) => {
                    console.log(data)
                    if (data.status !== "valid") {
                        reject("CNPJ INVÁLIDO")
                    }

                    resolve(data)
                })

        } catch (erro) {
            reject(erro)
        }
    });
}

//base64
function base64encode(string_to_encode) {
    let encoded_string = btoa(string_to_encode)
    return encoded_string
}

function base64decode(string_to_decode) {
    let decoded_string = atob(string_to_decode)
    return decoded_string
}

function trigger_wf_animation() {
    var ix = Webflow.require('ix');
    var $el = $('.your-selector-here');

    var trigger = { "type": "load", "stepsA": [{ "wait": 200 }, { "opacity": 1, "transition": "transform 500ms ease 0ms, opacity 500ms ease 0ms", "x": "0px", "y": "0px" }], "stepsB": [] };

    ix.run(trigger, $el);
}

window.onload = () => {
    //storage

    //set links to microservices and main server
    let main_server_link = $("#main-server").val()
    let view_server_link = $("#view-server").val()

    //store in session memory
    sessionStorage.setItem("main_server_link", main_server_link)
    sessionStorage.setItem("view_server_link", view_server_link)

    //whenClicked attribute
    var anchors = document.getElementsByTagName('*');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.onclick = function () {
            code = this.getAttribute('whenClicked');
            eval(code);
        }
    }

    //html injection
    $("#plans-loading").append(loading_animation.gears)
}

// page js
function set_type(type) {
    if (!type)
        reject("Cannot set type to null")

    try {
        sessionStorage.setItem("type", type)
        return

    } catch (erro) {
        throw new Error(erro)
    }
}

function display_form_error(error_message, form_id) {
    $(`#form-error-boxes-${form_id} > p`).text(error_message)
    $(`#form-error-boxes-${form_id}`).show().delay(5000).fadeOut();
}

function read_type() {
    try {
        return sessionStorage.getItem("type")

    } catch (erro) {
        throw new (error)
    }
}

function enable_next(form_id) {
    console.log(form_id)
    $(`#form-next-fake-${form_id}`).hide()
    $(`#form-next-${form_id}`).show()
}

function disable_next(form_id) {
    console.log(form_id)
    $(`#form-next-fake-${form_id}`).show()
    $(`#form-next-${form_id}`).hide()
}

function get_form_data() {
    return new Promise(async (resolve, reject) => {
        try {
            let type = read_type()
            let form_array = $(`#${type}-form`).serializeArray()
            let form = {}
            for (let i of form_array) {
                form[i.name] = i.value
            }
            resolve(form)

        } catch (erro) {
            reject(erro)
        }
    });
}

function get_plans() {
    return new Promise(async (resolve, reject) => {
        try {
            //get all data for the request
            let form_data = await get_form_data()
            let size = form_data.size
            let type = read_type()
            let view_server_link = sessionStorage.getItem("view_server_link")
            let filter = {
                route: "/get/template",
                data: {
                    template: {
                        lib: "public",
                        subject: "diverse",
                        name: "plans"
                    },
                    data: {
                        size: size,
                        type: type
                    }
                }
            }
            filter = base64encode(JSON.stringify(filter))

            //make the request
            axios.get(`${view_server_link}?params=${filter}`)
                .then((resp) => {
                    console.log(resp)
                    resolve(resp.data)
                })
                .catch((erro) => {
                    reject(erro)
                })

        } catch (erro) {
            reject(erro)
        }
    });
}

async function cnpj_fullfilment(fullfilment_id, form_id) {
    try {
        console.log("aqui")
        let cnpj = await $(`#${fullfilment_id}`).val()
        cnpj = (await validate_cnpj(cnpj)).data

        console.log(cnpj)
        //set data
        $("#company-name").val(cnpj.nome)
        $("#fantasy-name").val(cnpj.fantasia)
        $("#receipt-email").val(cnpj.email)
        $("#comercial-email").val(cnpj.email)
        $("#cnpj-supplier").val(cnpj.cnpj)

    } catch (erro) {
        display_form_error(erro, form_id)
        console.log(erro)
    }
}

function validate_form(form_id) {
    //form validation
    return new Promise(async (resolve, reject) => {
        try {
            let form_data = await get_form_data()
            //link to main server
            let main_server_link = sessionStorage.getItem("main_server_link")
            let data = {
                company: {
                    fantasy_name: form_data.fantasy_name, // sem entidade
                    company_name: form_data.company_name, // entidade
                    cnpj: form_data.cnpj, // entidade
                    phone: form_data.phone, // entidade
                    address: form_data.address,
                    minimal_sale_value: form_data.minimal_sale_value,
                    pis: form_data.pis,
                    cofins: form_data.cofins,
                    icms: form_data.icms,
                    state_subsid: form_data.state_subsid,
                    category: form_data.category, // sem entidade
                    certifications: form_data.certifications, // entidade
                    size: form_data.size // sem entidade
                },
                sign_in_data: {
                    login: form_data.login,
                    password: form_data.password,
                    email: form_data.email, // entidade
                    recovery_email: form_data.recovery_email,
                    type: read_type()
                }
            }
            //pack the params in base64
            data = base64encode(JSON.stringify(data))
            //make the call to the server

            axios.get(`${main_server_link}/user/validate?data=${data}`)
                .then((resp) => {
                    console.log(resp)
                })
                .catch((erro) => {
                    console.log("Erro ao validar formulário:", erro.response.data)
                    disable_next(form_id)
                    display_form_error(erro.response.data, form_id)
                    reject("formulário está invalido")
                })

            //form is good
            console.log("form validated", form_data)
            enable_next(form_id)
            resolve()

        } catch (erro) {
            console.log("Erro ao validar formulário:", erro)
            disable_next(form_id)
            display_form_error(erro, form_id)
            reject("formulário está invalido")
        }
    });
}

async function plans() {
    try {
        $("#plans").hide()
        $("#plans-500-error").hide()
        $("#plans-loading").show()
        await validate_form()
        let plans = await get_plans()
        console.log(plans)
        //render data in the template
        $("#plans").html(plans)
        $("#plans-loading").fadeOut()
        $("#plans").fadeIn()

    } catch (erro) {
        $("#plans-loading").fadeOut()
        $("#plans-500-error").fadeIn()
        console.log(erro)
    }
}

async function select_plan(plan) {
    try {
        let view_server_link = sessionStorage.getItem("view_server_link")
        let form_data = await get_form_data()
        let params = {
            route: "/checkout",
            data: {
                company: {
                    fantasy_name: form_data.fantasy_name, // sem entidade
                    company_name: form_data.company_name, // entidade
                    cnpj: form_data.cnpj, // entidade
                    phone: form_data.phone, // entidade
                    address: form_data.address,
                    minimal_sale_value: form_data.minimal_sale_value,
                    pis: form_data.pis,
                    cofins: form_data.cofins,
                    icms: form_data.icms,
                    state_subsid: form_data.state_subsid,
                    category: form_data.category, // sem entidade
                    certifications: form_data.certifications, // entidade
                    size: form_data.size // sem entidade
                },
                sign_in_data: {
                    login: form_data.login,
                    password: form_data.password,
                    email: form_data.email,
                    recovery_email: form_data.recovery_email, // entidade
                    chosen_plan: plan,
                    type: read_type()
                }
            }
        }
        console.log(params)
        params = base64encode(JSON.stringify(params))
        console.log(params)
        window.location.replace(`${view_server_link}?params=${params}`)

    } catch (erro) {
        console.log(erro)
    }
}


//animations

//loading gears
let loading_animation = {
    gears: `<div class="w-embed">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewbox="0 0 100 100" preserveaspectratio="xMidYMid">
      <g transform="translate(50 50)">
        <g transform="translate(-19 -19) scale(0.6)">
          <g transform="rotate(26.26)">
            <animatetransform attributename="transform" type="rotate" values="0;45" keytimes="0;1" dur="0.2s" begin="0s" repeatcount="indefinite"/>
            <path d="M31.359972760794346 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 7.0000000000000036 37.3496987939662 L7.0000000000000036 37.3496987939662 L7.000000000000004 47.3496987939662 L-6.999999999999999 47.3496987939662 L-7 37.3496987939662 A38 38 0 0 1 -21.46047782418268 31.35997276079435 L-21.46047782418268 31.35997276079435 L-28.531545636048154 38.431040572659825 L-38.43104057265982 28.531545636048158 L-31.359972760794346 21.460477824182682 A38 38 0 0 1 -37.3496987939662 7.000000000000007 L-37.3496987939662 7.000000000000007 L-47.3496987939662 7.000000000000008 L-47.3496987939662 -6.9999999999999964 L-37.3496987939662 -6.999999999999997 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#3cbeba"/>
          </g>
        </g>
        <g transform="translate(19 19) scale(0.6)">
          <g transform="rotate(41.24)">
            <animatetransform attributename="transform" type="rotate" values="45;0" keytimes="0;1" dur="0.2s" begin="-0.1s" repeatcount="indefinite"/>
            <path d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 L31.359972760794346 21.460477824182686 L38.431040572659825 28.531545636048158 L28.53154563604818 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 6.9999999999999964 37.3496987939662 L6.9999999999999964 37.3496987939662 L6.999999999999995 47.3496987939662 L-7.000000000000009 47.3496987939662 L-7.000000000000007 37.3496987939662 A38 38 0 0 1 -21.46047782418263 31.359972760794385 L-21.46047782418263 31.359972760794385 L-28.531545636048097 38.43104057265987 L-38.431040572659796 28.531545636048186 L-31.35997276079433 21.460477824182703 A38 38 0 0 1 -37.34969879396619 7.000000000000032 L-37.34969879396619 7.000000000000032 L-47.34969879396619 7.0000000000000355 L-47.3496987939662 -7.000000000000002 L-37.3496987939662 -7.000000000000005 A38 38 0 0 1 -31.359972760794346 -21.46047782418268 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#b00082"/>
          </g>
        </g>
      </g>
    </svg>
  </div>`
}