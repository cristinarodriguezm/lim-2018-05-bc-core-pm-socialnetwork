window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.classList.add("hidden");
            logout.classList.remove("hidden");
            wall.classList.remove("hidden");
            posts.classList.remove("hidden");
            username.innerHTML = `Bienvenida ${user.displayName}`;
            logo.classList.add("hidden");
            console.log("Usuario logueado");
        } else {
            console.log("No esta logueado")
            login.classList.remove("hidden");
            logout.classList.add("hidden");
            wall.classList.add("hidden");
            posts.classList.add("hidden");
            logo.classList.remove("hidden");
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

window.writeNewPost = (uid, body) => {
    // A post entry.
    var postData = {
        uid: uid,
        body: body,
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    return newPostKey
    
}


