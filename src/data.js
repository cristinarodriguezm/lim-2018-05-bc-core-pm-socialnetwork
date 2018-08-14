// Initialize Firebase
var config = {
    apiKey: "AIzaSyDblgQKEDvEZWnkfqvDkKM1GXZtRkkwBrI",
    authDomain: "social-network-8a5ae.firebaseapp.com",
    databaseURL: "https://social-network-8a5ae.firebaseio.com",
    projectId: "social-network-8a5ae",
    storageBucket: "social-network-8a5ae.appspot.com",
    messagingSenderId: "451218277174"
};
firebase.initializeApp(config);


window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
         
            login.classList.add("hidden");
            wall.classList.remove("hidden");
            posts.classList.remove("hidden");
            logo.classList.add("hidden");
            navbar.classList.remove("hidden");
            sideBar.classList.remove("hidden")
            console.log("Usuario logueado");
           
        } else {
            console.log("No esta logueado")
            login.classList.remove("hidden");
            wall.classList.add("hidden");
            posts.classList.add("hidden");
            logo.classList.remove("hidden");
            navbar.classList.add("hidden");
            sideBar.classList.add("hidden")
        }
    });
}


window.writeUserData = (userId, name, email, imageUrl) => {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        displayName: name
    });
}

window.writeNewPost = (uid, body, likes) => {
    // A post entry.
    var postData = {
        uid: uid,
        body: body,
        likes: 0
    
    };
    
   
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    postData.id = newPostKey;
    
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + postData.uid + '/' + newPostKey] = postData;
    

    firebase.database().ref().update(updates);
    return newPostKey

}

//funcion para eliminar posts
window.deletePost = (contPost,userId) => {
    //alert('hola ' + contPost); return false;
    console.log("userId", userId)
    console.log("contPost", contPost)
    firebase.database().ref().child('/user-posts/' + userId + '/' + contPost).remove();
    firebase.database().ref().child('posts/' + contPost).remove();
}

window.reload_page= ()=>{
    window.location.reload();
  }
