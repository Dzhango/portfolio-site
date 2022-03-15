window.addEventListener('load', loadHome);

function loadProjects(e) {
    console.log("fire");
    const projectsTemplate = document.getElementById('projects-template');
    const templateContent = projectsTemplate.content.cloneNode(true);
    const main = document.querySelector("main");
    main.innerHTML = "";
    main.appendChild(templateContent);
}

function loadHome(e) {
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

const homeBtn = document.querySelector("#home-btn");
homeBtn.addEventListener('click', loadHome);

const projectsBtn = document.querySelector("#projects-btn");
projectsBtn.addEventListener('click', loadProjects);

const blogBtn = document.querySelector("#blog-btn");
blogBtn.addEventListener('click', loadBlog);