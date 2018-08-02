const logOut = document.getElementById("btnLogout");
const signIn = document.getElementById("signinbtn");
const register = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const wall = document.getElementById("wall");
const btnPost = document.getElementById("btnPost");
const wallPosts = document.getElementById("wallPosts");
const textToPost = document.getElementById("textToPost")


window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.classList.remove("hidden");
            logout.classList.add("hidden");
            wall.classList.remove("hidden");
            wallPosts.classList.remove("hiden");
            console.log("Usuario logueado");
        } else {
            console.log("No esta logueado")
            login.classList.add("hidden");
            logout.classList.remove("hidden");
            wall.classList.add("hidden");
            wallPosts.classList.add("hiden");
        }
    });
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

register.addEventListener("click", () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log("Se creo el usuario");
        })
        .catch(function (error) {
            console.log(error.code, error.message);
        });
})

signIn.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log("Inicia sesion");
        })
        .catch(function (error) {
            console.log(error.code, error.message);
        });
})

logOut.addEventListener("click", () => {
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
        }).catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
})



function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    let postData = {
        author: username,
        uid: uid,
        body: body,
    };
    // Get a key for a new Post.
    let newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    return newPostKey;
}

btnPost.addEventListener("click", () => {
    let userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);

    let btnEdit = document.createElement("input");
    btnEdit.setAttribute("value", "Edit");
    btnEdit.setAttribute("type", "button");
    let btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Delete");
    btnDelete.setAttribute("type", "button");
    let contPost = document.createElement("div");
    let textPost = document.createElement("textarea");
    textPost.setAttribute("id", newPost);

    textPost.innerHTML = wallPosts.value
})
