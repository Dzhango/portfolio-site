import { customdialog } from "./customdialog.js";

const btns = document.querySelectorAll('button');
console.log(btns);


function customAlert(e) {
    alert("custom alert");
}

function customConfirm(e) {
    const confirmVal = confirm("custom cofirm");
    const output = document.querySelector('output');

    output.textContent = `\n The value returned by the confirm method is: ${confirmVal}`;
}

function customPrompt(e) {
    const promptVal = window.prompt("prompt?");
    const output = document.querySelector('output');

    output.textContent = promptVal !== null ? `${promptVal}` : `User didn’ t enter anything`;
}

function customSafePrompt(e) {

    const promptVal = window.prompt("prompt?");
    const clean = DOMPurify.sanitize(promptVal);
    const output = document.querySelector('output');

    output.textContent = promptVal !== null ? `${clean}` : `User didn’ t enter anything`;
}

btns[0].addEventListener('click', customAlert);
btns[1].addEventListener('click', customConfirm);
btns[2].addEventListener('click', customPrompt);
btns[3].addEventListener('click', customSafePrompt);

customdialog();