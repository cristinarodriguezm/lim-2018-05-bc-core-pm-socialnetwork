const login = document.getElementById("login");
const logout = document.getElementById("logout")
const btnLogOut = document.getElementById("btnLogout");
const btnSignIn = document.getElementById("signinbtn");
const register = document.getElementById("register");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailSigned = document.getElementById("email-signed");
const passwordSigned = document.getElementById("password-signed");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const wall = document.getElementById("wall");
const btnPost = document.getElementById("btnPost");
const post = document.getElementById("post");
const posts = document.getElementById("posts");
const username = document.getElementById("user-name");
const logo = document.getElementById("logo");
const navbar = document.getElementById("navbar");

// creando objeto que contiene la data del post

let postData = {
    uid: null,
    title: null,
    image: null,
    content: null,
    date: null,
    category: null,
    state: null,
    likes: null,
    comentary: null
  };

$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown();
  });



btnPost.addEventListener('click', () => {
    if(post.value===""){
        M.toast({html: 'Mensaje vacio, intenta de nuevo'})
    }

    else{
    let userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);
  

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Update");
    btnUpdate.setAttribute("type", "button");
    btnUpdate.setAttribute("id", "btnUpdate");
    btnUpdate.setAttribute("class", "btn waves-effect waves-light");
    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Delete");
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.setAttribute("class", "btn waves-effect waves-light");

    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea')
    textPost.setAttribute("id", newPost);

    textPost.innerHTML = post.value;

    btnDelete.addEventListener('click', () => {        
        
        while (contPost.firstChild) contPost.removeChild(contPost.firstChild);

        M.toast({html: 'Tu publicacion ha sido eliminada'})
        //window.btnDelete(post.id)
        console.log("post a eliminar", post)
        reload_page();

    });

    btnUpdate.addEventListener('click', () => {
        console.log("diste click");
        
        const newUpdate = document.getElementById(newPost);
        const nuevoPost = {
            body: newUpdate.value,
        };

        var updatesUser = {};
        var updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        updatesPost['/posts/' + newPost] = nuevoPost;

        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);

    });

    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    posts.appendChild(contPost);
}})

register.addEventListener("click", () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log("Se creo el usuario");
        })
        .catch(function (error) {
            console.log(error.code, error.message);
        });
})

btnSignIn.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(emailSigned.value, passwordSigned.value)
  
        .then(function () {
            console.log("Inicia sesion");
            let user = result.user;        
            writeUserData(user.uid, user.displayName, user.email, user.photoURL)
        })
        .catch(function (error) {
            console.log(error.code, error.message);
        });
})

btnLogOut.addEventListener("click", () => {
    firebase.auth().signOut()
        .then(function () {
            console.log("Cerro Sesion");
            login.classList.remove("hidden");
            logout.classList.add("hidden");

        }).catch(function (error) {
            console.log("Error al cerrar sesion")
        });
})

btnGoogle.addEventListener("click", () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log("Sesion con Google");
            let user = result.user;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL)
        }).catch(function (error) {

            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);

        });
})

btnFacebook.addEventListener("click", () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log("Logueado con Facebook")
            let user = result.user;
            writeUserData(user.uid, user.displayName, user.email, user.photoURL)
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
})


