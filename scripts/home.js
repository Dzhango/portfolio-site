import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBoRP11Fg4h_uOM2JNFxlfdbIWyg1ryX94",
    authDomain: "portfolio-site-f9ccc.firebaseapp.com",
    projectId: "portfolio-site-f9ccc",
    storageBucket: "portfolio-site-f9ccc.appspot.com",
    messagingSenderId: "643628474044",
    appId: "1:643628474044:web:a96164f99abddd47e83ab9",
    measurementId: "G-KBL200L56X"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function handleLogin(e) {
    // const form = document.forms[0]
    let email = document.querySelector('input[name="username"]').value;
    let password = document.querySelector('input[name="psw"]').value;
    email = DOMPurify.sanitize(email);
    password = DOMPurify.sanitize(password);
    setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    document.querySelector("#login-container").setAttribute("style", "display: none");;
                    document.querySelector("#LogOut").setAttribute("style", "display: visible");;
                    // ...
                })
                .catch((error) => {
                    console.log(error)
                    alert("Email or Password is incorrect")
                    document.querySelector('input[name="username"]').value = "";
                    document.querySelector('input[name="psw"]').value = "";
                });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    loadBlog();
}

function handleLogOut() {
    signOut(auth)
        .then(() => {
            document.querySelector("#login-container").setAttribute("style", "display: visible");
            document.querySelector("#LogOut").setAttribute("style", "display: none");
            document.querySelector('input[name="username"]').value = "";
            document.querySelector('input[name="psw"]').value = "";
            loadBlog();
        })
        .catch((error) => {
            console.log(error)
        });
}

const db = getFirestore(app);
const postsRef = collection(db, "posts");

async function createNewPost(e) {
    // loadTemplateBlog();
    const post = {}
    post.title = document.querySelector("#title").value;
    post.postText = document.querySelector("#post-text").value;
    console.log(post);
    const datetime = "Posted on " + new Date().today() + " @ " + new Date().timeNow();
    post.datetime = datetime
    await addDoc(postsRef, post);
    window.location.href = "/";
}

// For todays date;
Date.prototype.today = function() {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}


// HOME SCRIPT
window.addEventListener('load', loadHome);


function loadProjects(e) {
    const projectsTemplate = document.getElementById('projects-template');
    const templateContent = projectsTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}

function loadHome(e) {
    document.addEventListener('click', (e) => {

        if (e.target.className === "editbtn") {
            console.log("triggered")
            loadTemplateBlog(e);
            return;
        }

        switch (e.target.id) {
            case "Login":
                handleLogin(e);
                break;
            case "home-btn":
                loadHome(e);
                break;
            case "projects-btn":
                loadProjects(e);
                break;
            case "blog-btn":
                loadBlog(e);
                break;
            case "LogOut":
                handleLogOut(e);
                break;
            case "addbtn":
                loadTemplateBlog(e);
                break;
            case "postbtn":
                createNewPost(e);
                break;
            default:
        }
    })
    auth.onAuthStateChanged(function(user) {
        if (user) {
            document.querySelector("#login-container").setAttribute("style", "display: none");
            document.querySelector("#LogOut").setAttribute("style", "display: block");
        } else {
            document.querySelector("#login-container").setAttribute("style", "display: block");
            document.querySelector("#LogOut").setAttribute("style", "display: none");
        }
    });

    const homeTemplate = document.getElementById('home-template');
    const templateContent = homeTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}

async function loadBlog(e) {
    const blogTemplate = document.getElementById('blog-template');
    const templateContent = blogTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);

    const postsRef = collection(db, "posts");
    const docs = await getDocs(postsRef);
    let docsArr = []
    docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const blog = {...doc.data() }

        docsArr.push(blog);
    });

    const blogContainer = document.querySelector("#blog-container");
    docsArr.forEach((el) => {
        const blog =
            `<section class="blog">
        <container class="blog-post-title">
            <h2>${el.title}</h2>
            <h3>${el.datetime}</h3>
        </container>
        <container class="blog-post-text">
            <article>${el.postText}</article>
        </container>
    </section>`;

        blogContainer.innerHTML += blog;
        // window.location.href = "/"
    })

    auth.onAuthStateChanged(function(user) {
        if (user) {
            document.querySelector("#addbtn").setAttribute("style", "display: block");
        } else {
            document.querySelector("#addbtn").setAttribute("style", "display: none");
        }
    });

    // auth.onAuthStateChanged(function(user) {
    //     const editBtns = document.querySelectorAll(".editbtn");
    //     const deleteBtns = document.querySelectorAll(".deleteBtn");
    //     if (user) {
    //         editBtns.forEach((btn) => {
    //             // console.log("in")
    //             // btn.addEventListener("click", loadTemplateBlog);
    //         })
    //         deleteBtns.forEach((btn) => {
    //             btn.addEventListener("click", deleteBlog);
    //         })
    //     } else {
    //         editBtns.forEach((btn) => {
    //             // btn.setAttribute("style", "display: none");
    //         })
    //         deleteBtns.forEach((btn) => {
    //             btn.setAttribute("style", "display: none");
    //         })
    //     }
    // })

}

function deleteBlog() {
    console.log("deleted")
}

function loadTemplateBlog() {
    const blogTemplate = document.getElementById('create-template');
    const templateContent = blogTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}