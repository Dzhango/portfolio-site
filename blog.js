window.addEventListener('DOMContentLoaded', init);


export function init() {
    console.log("fire");
    populateBlog();
    const add = document.querySelector("#addPost");
    const addCancel = document.querySelector("#cancelPrompt");
    const addConfirm = document.querySelector("#confirmPrompt");
    const addPrompt = document.querySelector("#addPrompt");

    const editPrompt = document.querySelector("#editPrompt");
    const deletePrompt = document.querySelector("#deletePrompt");

    //add blog
    add.addEventListener('click', () => {
        addPrompt.querySelector("#add-title").value = "";
        addPrompt.querySelector("#add-summary").value = "";
        addPrompt.showModal();
    });

    addCancel.addEventListener('click', () => {
        addPrompt.close();
    });

    addConfirm.addEventListener('click', () => {
        addPrompt.close();
        let title = document.querySelector("#add-title");
        title = DOMPurify.sanitize(title.value);
        let summary = document.querySelector("#add-summary");
        summary = DOMPurify.sanitize(summary.value);

        addPost(title, summary);
    });

    // confirmEdit.addEventListener('click', (e) => {
    //     editPrompt.close();
    //     editPost(e);
    // })

    // confirmEdit.addEventListener('click', (e) => {
    //     editPrompt.close();
    //     editPost(e);
    // })

}

function addPost(title, summary) {
    const date = new Date();
    const id = date.getTime().toString();
    let data = {
        id: id,
        title: title,
        summary: summary,
        date: date
    }
    console.log(data);

    localStorage.setItem(id, JSON.stringify(data));

    populateBlog();
}


function populateBlog() {

    const blogSection = document.querySelector("#posts");
    blogSection.innerHTML = "";
    if (localStorage.length === 0) return;
    const blogs = {...localStorage };
    console.log(blogs);
    for (const cur in blogs) {
        let data = JSON.parse(blogs[cur]);
        blogSection.insertAdjacentHTML('afterbegin', createPost(data));
        const article = document.getElementById(`${data.id}`)
        const editBtn = article.querySelector('.edit');
        const deleteBtn = article.querySelector('.delete');
        const confirmEdit = article.querySelector('.edit');
        const confirmDelete = article.querySelector('.delete');


        editBtn.addEventListener('click', (e) => {
            editPrompt.showModal();
            console.log(e.target.parentNode);
            e.target.parentNode.querySelector('h2').value = data.title;
            e.target.parentNode.querySelector('p').value = data.summary;
        });
        deleteBtn.addEventListener('click', () => {
            deletePrompt.showModal();
        });

        confirmEdit.addEventListener('click', (e) => {
            editPrompt.close();
            editPost(e);
        })

        confirmDelete.addEventListener('click', (e) => {
            editPrompt.close();
            deletePost(e);
        })

    }
}


function createPost(data) {
    const date = new Date(data.date);
    console.log(data);
    // const id = date.getTime();
    const blog =
        `<article id=${data.id}>
                <h2>${data.title}</h2>
                <p>${data.summary}</p>
                <time>${date.toString()}</time>
                <button class="edit">edit</button>
                <button class="delete">delete</button>
             </article>`

    return blog;
}

function deletePost(e) {
    // console.log(e.target.parentNode.id);
    const post = localStorage.getItem(e.target.parentNode.id);
    if (post !== null) {
        localStorage.removeItem(e.target.parentNode.id);
        populateBlog();
        return true;
    } else {
        return false;
    }
}

function editPost(e) {

    const post = JSON.parse(localStorage.getItem(e.target.parentNode.id));
    if (post !== null) {

        let title = document.querySelector("#edit-title");
        title = DOMPurify.sanitize(title.value);
        let summary = document.querySelector("#edit-summary");
        summary = DOMPurify.sanitize(summary.value);

        post.title = title;
        post.summary = summary;

        document.querySelector('#confirmEdit').addEventListener('click', () => {
            localStorage.setItem(e.target.parentNode.id, JSON.stringify(data));
        })

        populateBlog();
        return true;
    } else {
        return false;
    }
}