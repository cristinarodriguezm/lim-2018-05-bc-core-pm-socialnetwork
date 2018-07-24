window.onload = ()=>{
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            loggedIn.style.display = "block";
            loggedOut.style.display = "none";
        }
        else{
            loggedIn.style.display = "none";
            loggedOut.style.display = "block";
        }
        console.log("User >"+JSON.stringify(user));
    });

}

function registerWithFirebase () {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
        console.log("Usuario creado con exito");
    })

    .catch((error)=> {
        console.log("Error de firebase > Codigo >"+error.code);
        console.log("Error de firebase > Mensaje >"+error.message);
    });
}

function loginWithFirebase () {
    const emailValue = email.value;
    const passwordValue = password.value;

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(()=> {
        console.log("Usuario logueado con exito");

    })

    .catch((error)=> {
        console.log("Error de firebase > Codigo >"+error.code);
        console.log("Error de firebase > Mensaje >"+error.message);
    });
}