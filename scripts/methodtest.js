const getBtn = document.querySelector("#get");
const postBtn = document.querySelector("#post");
const putBtn = document.querySelector("#put");
const deleteBtn = document.querySelector("#delete");
const output = document.querySelector("output");


window.onload = function() {
    // form.addEventListener('submit', formSubmit);
    getBtn.addEventListener('click', xhrRequest);
    postBtn.addEventListener('click', xhrRequest);
    putBtn.addEventListener('click', xhrRequest);
    deleteBtn.addEventListener('click', xhrRequest);
}

function xhrRequest(e) {
    setDate();
    const method = e.target.id;
    var xhr = new XMLHttpRequest();
    const URL = `https://httpbin.org/${method}`;
    getBtn.disabled = true;
    postBtn.disabled = true;
    putBtn.disabled = true;
    deleteBtn.disabled = true;

    xhr.timeout = 5000; // time in milliseconds

    xhr.open(method, URL, [true]);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            // const jsonResponse = JSON.parse(xhr.responseText);
            const pre = document.createElement('pre');
            pre.textContent = xhr.responseText

            document.querySelector("output").innerHTML = "";
            document.querySelector("output").appendChild(pre);
            getBtn.disabled = false;
            postBtn.disabled = false;
            putBtn.disabled = false;
            deleteBtn.disabled = false;

        } else {
            console.log("error response");
        }
    };

    const form = document.querySelector("form");
    let formData = new FormData(document.forms.request);
    if (method === "get") {
        xhr.send()
    } else {
        //get all form data
        console.log(document.forms.request)
        xhr.send(formData)
    }
    // } else if (method === "put") {
    //     //get all form data
    //     console.log(document.forms.request)
    //     xhr.send(formData)
    // } else if (method === "delete") {
    //     xhr.send(formData)
    // }

    // xhr.onload = function() {
    //     alert(`Loaded: ${xhr.status} ${xhr.response}`);
    // };

    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
    };

    xhr.ontimeout = function(e) {
        alert('timeout')
    };
}

function setDate() {
    const currentdate = new Date();
    const datetime = "Last Sync: " + currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    document.querySelector("#date").value = datetime;
}