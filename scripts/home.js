import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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
    if (localStorage.getItem("isAuth")) {
        alert("Already Logged In!");
        return;
    }
    // const form = document.forms[0]
    const email = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="psw"]').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            localStorage.setItem("isAuth", true);
            document.querySelector("#login-container").setAttribute("style", "display: none");;
            document.querySelector("#LogOut").setAttribute("style", "display: visible");;
            // window.location.href = "/";
            // ...
        })
        .catch((error) => {
            console.log(error)
            alert("Email or Password is incorrect")
            document.querySelector('input[name="username"]').value = "";
            document.querySelector('input[name="psw"]').value = "";
        });
}

function handleLogOut() {
    if (!localStorage.getItem("isAuth")) {
        return;
    }

    signOut(auth).then(() => {
            localStorage.clear();
            window.location.href = "/";
        })
        .catch((error) => {
            console.log(error)
        });
}


// HOME SCRIPT
window.addEventListener('load', loadHome);

// document.addEventListener('click', handleLogin);
document.addEventListener('click', (e) => {

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
        default:
    }
})

function loadProjects(e) {
    console.log("fire");
    const projectsTemplate = document.getElementById('projects-template');
    const templateContent = projectsTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}

function loadHome(e) {
    if (localStorage.getItem("isAuth")) {
        document.querySelector("#login-container").setAttribute("style", "display: none");
        document.querySelector("#LogOut").setAttribute("style", "display: visible");
    } else {
        document.querySelector("#login-container").setAttribute("style", "display: visible");
        document.querySelector("#LogOut").setAttribute("style", "display: none");;
    }
    console.log("fire");
    const homeTemplate = document.getElementById('home-template');
    const templateContent = homeTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}

function loadBlog(e) {
    console.log("fire");
    const blogTemplate = document.getElementById('blog-template');
    const templateContent = blogTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);

}