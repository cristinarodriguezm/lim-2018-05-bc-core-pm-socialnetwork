const logOut = document.getElementById("btnLogout");
const signIn = document.getElementById("signinbtn");
const register = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("password");


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

