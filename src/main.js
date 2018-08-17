
const login = document.getElementById("login");
const logout = document.getElementById("logout")
const btnLogOut = document.getElementById("btnLogout");
const btnLogout2 = document.getElementById("btnLogout2");
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
const btnPost2 = document.getElementById("btnPost2");
const post = document.getElementById("post");
const posts = document.getElementById("posts");
const username = document.getElementById("user-name");
const logo = document.getElementById("logo");
const navbar = document.getElementById("navbar");
const sideBar = document.getElementById("side-bar");
const checkBox = document.getElementById("check-box");
const privateWall = document.getElementById("private-wall")
// creando objeto que contiene la data del post


$(document).ready(function () {
    $('.collapsible').collapsible();
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();

});



btnPost.addEventListener('click', () => {
    if (post.value === "") {
        M.toast({ html: 'Mensaje vacio, intenta de nuevo' })
    }

    else {
        let userId = firebase.auth().currentUser.uid;
        const newPost = writeNewPost(userId, post.value);
        //crearElementos(userId,post.value);
        //,newPost
    }
})

btnPost2.addEventListener('click', () => {
    if (post.value === "") {
        M.toast({ html: 'Mensaje vacio, intenta de nuevo' })
    }

    else {
        let userId = firebase.auth().currentUser.uid;
        const newPost = writeNewPost(userId, post.value);
        //crearElementos(userId,post.value);
        //,newPost
    }
})


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



crearElementos = (userId, newPost, texto) => {
    //console.log('entra a crear');

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");
    btnUpdate.setAttribute("id", "btnUpdate");
    btnUpdate.setAttribute("class", "btn waves-effect waves-light");
    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.setAttribute("class", "btn waves-effect waves-light");
    var btnlike = document.createElement("input");
    btnlike.setAttribute("value", "Me gusta");
    btnlike.setAttribute("type", "button");
    btnlike.setAttribute("id", "btnlike");
    btnlike.setAttribute("class", "btn waves-effect waves-light");

    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea')
    textPost.setAttribute("id", newPost);

    textPost.innerHTML = texto;

    btnDelete.addEventListener('click', () => {
        const opcion = confirm("Estas seguro que deseas eliminar este post");
        if (opcion == true) {
            while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
            M.toast({ html: 'Tu publicacion ha sido eliminada' })
            //window.btnDelete(post.id)
            console.log("post a eliminar", post);
            deletePost(textPost.id, userId);

        }
        else {
            ;
        }
    });

   
 

    btnUpdate.addEventListener('click', () => {
        console.log("diste click " + newPost);

        const newUpdate = document.getElementById(newPost);
        const nuevoPost = {
            body: newUpdate.value
        };

        firebase.database().ref('/user-posts/' + userId + '/' + newPost).update(nuevoPost);
        firebase.database().ref('/posts/' + newPost).update(nuevoPost);

    });


    btnlike.addEventListener('click', () => {
        console.log("diste click");

        //const newUpdate = document.getElementById(newPost);
        const nuevoLike = {

        };
        //agregar idusuario como clave dinamica
        nuevoLike[userId] = 1;

        firebase.database().ref('posts/' + newPost + "/likes/" + userId).once("value")
            .then(function (snapshot) {//evalua si existe la ruta y lo devuelve

                if (snapshot.exists()) {//metodo exists
                    console.log("ya tiene like");
                    //si el like del usuario ya existe lo elimina 
                    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost + "/likes/" + userId).remove();
                    firebase.database().ref().child('posts/' + newPost + "/likes/" + userId).remove();
                    btnlike.style.backgroundColor = "grey";


                    return false;
                } else {
                    console.log("no tiene like");
                    //insertar like del usuario
                    firebase.database().ref('/user-posts/' + userId + '/' + newPost + "/likes").update(nuevoLike);
                    firebase.database().ref('/posts/' + newPost + "/likes").update(nuevoLike);
                    btnlike.style.backgroundColor = "green";
                    var contador = 0;
                    document.getElementById("btnlike").onclick = function () {
                        contador++;
                        alert(contador);

                    }
                    // return false;
                }

            });



    });

    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(btnlike);
    posts.appendChild(contPost);

}

crearElementos2 = (userId, newPost, texto) => {
    //console.log('entra a crear');

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");
    btnUpdate.setAttribute("id", "btnUpdate");
    btnUpdate.setAttribute("class", "btn waves-effect waves-light");
    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.setAttribute("class", "btn waves-effect waves-light");
    var btnlike = document.createElement("input");
    btnlike.setAttribute("value", "Me gusta");
    btnlike.setAttribute("type", "button");
    btnlike.setAttribute("id", "btnlike");
    btnlike.setAttribute("class", "btn waves-effect waves-light");

    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea')
    textPost.setAttribute("id", newPost);

    textPost.innerHTML = texto;

    btnDelete.addEventListener('click', () => {
        const opcion = confirm("Estas seguro que deseas eliminar este post");
        if (opcion == true) {
            while (contPost.firstChild) contPost.removeChild(contPost.firstChild);
            M.toast({ html: 'Tu publicacion ha sido eliminada' })
            //window.btnDelete(post.id)
            console.log("post a eliminar", post);
            deletePost(textPost.id, userId);

        }
        else {
            ;
        }
    });

   
 

    btnUpdate.addEventListener('click', () => {
        console.log("diste click " + newPost);

        const newUpdate = document.getElementById(newPost);
        const nuevoPost = {
            body: newUpdate.value
        };

        firebase.database().ref('/user-posts/' + userId + '/' + newPost).update(nuevoPost);
        firebase.database().ref('/posts/' + newPost).update(nuevoPost);

    });


    btnlike.addEventListener('click', () => {
        console.log("diste click");

        //const newUpdate = document.getElementById(newPost);
        const nuevoLike = {

        };
        //agregar idusuario como clave dinamica
        nuevoLike[userId] = 1;

        firebase.database().ref('posts/' + newPost + "/likes/" + userId).once("value")
            .then(function (snapshot) {//evalua si existe la ruta y lo devuelve

                if (snapshot.exists()) {//metodo exists
                    console.log("ya tiene like");
                    //si el like del usuario ya existe lo elimina 
                    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost + "/likes/" + userId).remove();
                    firebase.database().ref().child('posts/' + newPost + "/likes/" + userId).remove();
                    btnlike.style.backgroundColor = "grey";


                    return false;
                } else {
                    console.log("no tiene like");
                    //insertar like del usuario
                    firebase.database().ref('/user-posts/' + userId + '/' + newPost + "/likes").update(nuevoLike);
                    firebase.database().ref('/posts/' + newPost + "/likes").update(nuevoLike);
                    btnlike.style.backgroundColor = "green";
                    var contador = 0;
                    document.getElementById("btnlike").onclick = function () {
                        contador++;
                        alert(contador);

                    }
                    // return false;
                }

            });



    });

    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(btnlike);
    privateWall.appendChild(contPost);

}


checkBox.addEventListener("change", ()=>{
   if(checkBox.checked==true){
      privateWall.classList.remove("hidden");
      posts.classList.add("hidden");
      
   } else {
    privateWall.classList.add("hidden");
    posts.classList.remove("hidden");
   }
 })

