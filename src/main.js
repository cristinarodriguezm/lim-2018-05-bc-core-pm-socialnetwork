const logOut = document.getElementById("btnLogout");
const signIn = document.getElementById("signinbtn");
const register = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const wall = document.getElementById("")



window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         login.classList.remove("hidden");
         logout.classList.add("hidden");   
          console.log("Usuario logueado")
        } else {
          console.log("No esta logueado")
          login.classList.add("hidden");
          logout.classList.remove("hidden");
        }
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
.then(function() {
    console.log("Inicia sesion");
})
.catch(function(error) {
    console.log(error.code, error.message);
  });
})

logOut.addEventListener("click", () => {
    firebase.auth().signOut()
        .then(function() {
        console.log("Cerro Sesion");
        login.classList.remove("hidden");
        logout.classList.add("hidden");

    }). catch(function(error) {
        console.log("Error al cerrar sesion")
    });
})

btnGoogle.addEventListener("click", () =>{
    let provider= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
        console.log("Sesion con Google");
        let user = result.user;
        writeUserData(user.uid, user.displayName, user.email, user.photoURL)
      }).catch(function(error) {
       
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      
      });
})

btnFacebook.addEventListener("click", () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display' : 'popup'
    });
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log("Logueado con Facebook")
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
       });
})

