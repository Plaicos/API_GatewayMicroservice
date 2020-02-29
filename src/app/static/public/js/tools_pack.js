function get_sessionCookie() {
    let cookie = document.cookie.split("=").pop()
    return (cookie)
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

//notification system
function notify_error(message, status){
    $("#error-notification-message").text(message)
    $("#error-notification-status").text(status)
    $("#error-notification").fadeIn().delay(5000).fadeOut()
}

function get_form_data(form_id) {
    let form_arr = $(`#${form_id}`).serializeArray()
    let form = {}
    for (let i of form_arr) {
        form[i.name] = i.value
    }
    return form;
}

function update_html(element_id, html) {
    if (!element_id) {
        throw new Error("CANT UPDATE ELEMENTS HTML WITHOUT AN ID");
    } else {
        try {
            $(`#${element_id}`).html(html)
            return true

        } catch (erro) {
            throw new Error(`AN ERROR TRYING TO UPDATE AN ELEMENTS HTML, ELEMENT ID: ${element_id}, ERROR: ${erro}`)
        }
    }
}

function show(id) {
    $(`#${id}`).fadeIn()
}

function hide(id) {
    $(`#${id}`).fadeOut()
}

function show_loading_animation(parent_id) {
    $(`#${parent_id} .loading-animation-div`).fadeIn()
}

function hide_loading_animation(parent_id) {
    $(`#${parent_id} .loading-animation-div`).fadeOut()
}