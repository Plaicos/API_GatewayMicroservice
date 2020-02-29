
var public_key = $("#mercado-pago-public-key").val()
window.Mercadopago.setPublishableKey(public_key);
var id_types = window.Mercadopago.getIdentificationTypes()

//tools

//base64
function base64encode(string_to_encode) {
    let encoded_string = btoa(string_to_encode)
    return encoded_string
}

function base64decode(string_to_decode) {
    let decoded_string = atob(string_to_decode)
    return decoded_string
}

function get_form_data() {
    let form_data = {
        card_number: $("#cardNumber").val(),
        card_code: $("#securityCode").val(),
        card_name: $("#cardholderName").val(),
        email: $("#email").val(),
        card_expire_month: $("#cardExpirationMonth").val(),
        card_expire_year: $("#cardExpirationYear").val(),
        document_type: $("#document-type").val(),
        document_number: $("#docNumber").val(),
        payment_method_id: $("#paymentMethodId").val()
    }
    return form_data;
}

function check_card_lenght() {
    let card_numbers = $("#cardNumber").val()


    if (!typeof card_numbers == 'string') {
        card_numbers = card_numbers.toString()
    }
    var card_lenght = card_numbers.length
    card_numbers = card_numbers.substring(0, 6)

    if (card_lenght >= 6) {
        guess_payment_mehtod_id(card_numbers)
    }
}

function guess_payment_mehtod_id(numbers) {
    console.log(numbers)
    window.Mercadopago.getPaymentMethod({
        "bin": numbers
    }, set_payment_method)
}

function set_payment_method(status, resp) {

    if (status == 200) {
        const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');

        if (paymentMethodElement) {
            paymentMethodElement.value = resp[0].id;
        } else {
            var form = $("#payment-form")
            const input = document.createElement('input');
            input.setattribute('name', 'paymentMethodId');
            input.setAttribute('type', 'hidden');
            input.setAttribute('value', response[0].id);

            form.appendChild(input);
        }
    } else {
        alert(`payment method info error: ${response}`);
    }
}

function pay() {
    try {
        let form = $("#mp-payment-form")
        let form_data = get_form_data()
        let main_server_link = sessionStorage.getItem("main_server_link")
        //get subscription data
        let subs_form_data = sessionStorage.getItem("subs_form_data")
        subs_form_data = JSON.parse(base64decode(subs_form_data))
        //build body
        let body = {
            company: subs_form_data.company,
            sign_in_data: subs_form_data.sign_in_data,
            payment_data: {
                payment_method: {
                    method: "mercado pago",
                    data: {
                        foo: "bar"
                    },
                }
            }
        }

        axios.post(`${main_server_link}/user`, body)
            .then((resp) => {
                console.log(resp)
            })
            .catch((erro) => {
                console.log(erro)
            })

    } catch (erro) {
        console.log(erro)
    }
    // window.Mercadopago.createToken(form, async function (status, resp) {
    //     if (status == 200) {
    //         resp.method_id = form_data.payment_method_id
    //         //recall data from subscription form
    //         let subs_form_data = sessionStorage.getItem("subs_form_data")
    //         subs_form_data = JSON.parse(base64decode(subs_form_data))

    //         //builds the params object
    //         let body = {
    //             company: subs_form_data.company,
    //             sign_in_data: subs_form_data.sign_in_data,
    //             payment_data: {
    //                 payment_method: {
    //                     method: "mercado pago",
    //                     data: resp,
    //                 }
    //             }
    //         }

    //         fetch(main_server_link + '/api/base/user', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(body)
    //         }).then((resp) => {
    //             console.log(resp)
    //         }).catch((erro) => {
    //             console.log(erro)
    //         })
    //     }
    //     else {
    //         console.log("algo deu errado")
    //     }
    // })
}

//onload function
window.onload = (event) => {
    //storage

    //store data from the subscription data
    let subs_form_data = $("#subscription-data").val()
    sessionStorage.setItem("subs_form_data", subs_form_data)

    //links to main server and microservices
    var main_server_link = $("#main-server-link").val()
    sessionStorage.setItem("main_server_link", main_server_link)

    //whenClicked attribute
    var anchors = document.getElementsByTagName('*');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.onclick = function () {
            code = this.getAttribute('whenClicked');
            eval(code);
        }
    }
}