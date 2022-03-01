window.addEventListener('DOMContentLoaded', customdialog);

export function customdialog() {
    const btns = document.querySelectorAll('button');

    const dialogAlert = document.querySelector('#alert');
    const dialogConfirm = document.querySelector('#confirm');
    const dialogPrompt = document.querySelector('#prompt');

    const btnClose = document.querySelector('#close');
    const cancelConfirm = document.querySelector('#cancel-confirm');
    const okConfirm = document.querySelector('#ok-confirm');
    const cancelPrompt = document.querySelector('#cancel-prompt');
    const okPrompt = document.querySelector('#ok-prompt');

    const input = document.querySelector('#name');


    const output = document.querySelector('output');

    btns[0].addEventListener('click', customAlert);
    btns[1].addEventListener('click', customConfirm);
    btns[2].addEventListener('click', customPrompt);

    btnClose.addEventListener('click', () => {
        dialogAlert.close();
    });

    cancelConfirm.addEventListener('click', () => {
        dialogConfirm.close();
        output.innerText = 'Confirm result: false';
    })

    okConfirm.addEventListener('click', () => {
        dialogConfirm.close();
        output.innerText = 'Confirm result: true';
    })

    okPrompt.addEventListener('click', () => {
        dialogPrompt.close();
        let cleanVal = DOMPurify.sanitize(input.value);
        if (cleanVal) {
            output.innerHTML = cleanVal;
            output.innerHTML = `Prompt result: ${cleanVal}`;
        } else {
            output.innerHTML = 'User didn\'t enter anything';
        }
    })

    cancelPrompt.addEventListener('click', () => {
        dialogPrompt.close();

    })


}

function customAlert(e) {
    const dialogAlert = document.querySelector('#alert');
    dialogAlert.showModal();
}

function customConfirm(e) {
    const dialogConfirm = document.querySelector('#confirm');

    dialogConfirm.showModal();
}

function customPrompt(e) {
    const dialogPrompt = document.querySelector('#prompt');
    dialogPrompt.showModal();

}