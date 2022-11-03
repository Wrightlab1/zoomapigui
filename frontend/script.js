
const backend_url = 'http://localhost:3000'



// Read the input values from the URL and DATA fields
//Then send the request to backend API Server
//Then write the response to the textArea
function getInputs() {
    let URL = document.getElementById('urlInput').value
    let DATA = document.getElementById('bodyInput').value
    send_to_backend(ACTION, URL, DATA)

}




//Set the RESTful action when selected in dropdown
// need to update text of dropdown
function setAction(action) {
    window.ACTION = action
    $(".btn.dropdown-toggle").text(action)
}

//Write text to textArea
function showMessage(message) {
    document.getElementById('outputText').value = message
}

//Clear text from textArea
function clearText() {
    document.getElementById('outputText').value = ""
}


function send_to_backend(action, zoomurl, data) {
    if (data) {
        console.log('true')
        var body = data
        var local_action = 'post'
    }
    else {
        console.log('false')
        var local_action = 'get'
    }
    url = backend_url + "?action=" + action + "&zoomurl=" + zoomurl
    const xhr = new XMLHttpRequest();
    xhr.open(local_action, url, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showMessage(this.responseText);
        }
    }
    console.log(body)
    xhr.send(body)

}



/*
//send_request to backend express API server
async function send_to_backend(action, url, data) {
    const request = await fetch(backend_url, {
        method: 'get',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkZNdUM4dnhrUnlxWHRvNXRDSHpnVXciLCJleHAiOjE2Njc0MDAzMjksImlhdCI6MTY2NzMxMzkyOX0.6_Iu-LL1otn4uJl2F6cO7kl9qVoOr9WruftuvcbSjXo',
            'content-type': 'application/json'
        },
        if(data) {
            body: JSON.stringify(data)
        }

    })
    return request.json();
}
*/