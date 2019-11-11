

  //get elements from the DOM
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignup = document.getElementById("btnSignup");
  const btnLogout = document.getElementById("btnLogout");

  //add login event. 
  //read this: https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc
  //document.getElementById("btnLogin").addEventListener("click", e => {
  btnLogin.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    //promise.catch(e => console.log(e.message));
    //promise.catch(e => console.log("promise catch, login successfully"));
    //promise.catch(e => window.location = 'home.html');
  });

  //add signup event
  btnSignup.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    database.ref().set({
        email: email,
        password: pass,
      });
    //promise.catch(e => console.log(e.message));
    $("#loginState").append("<br>One user is now signed up!");
    //console.log(firebaseUser.uid)
    //async function createNewAccount() {
    //    try {
    //        const firebaseUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //        console.log(firebaseUser.uid)
    //        database.ref().set({
    //            email: email,
    //            password: pass,
    //          });
    //    } catch (error) {
    //        console.log(error.message)
    //    }
    //}    
    
});

//add a logout fucntion
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    console.log("logout clicked");
    //window.location = 'auth.html';
});


//add a realtiem lister for auth state change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("state change, login is successful");
        console.log("firebaseUser is: " + firebaseUser);
        console.log("firebaseUser email is: " + firebaseUser.email);
        console.log("firebaseUser uid is: " + firebaseUser.uid);
        //make logout btn visiable after user login
        btnLogout.classList.remove("hide");
        $("#loginState").append("<br>One user is now login!");
        //var user = firebase.auth().currentUser;
        //console.log(user);
        //console.log("all login users are " + user);
        //writeUserData(firebaseUser);
    } else {
        console.log("state change, Not log in");
        //make logout btn invisiable if user not login
        btnLogout.classList.add("hide");
        $("#loginState").append("<br>One user is now logout!");

    }
});


//function writeUserData(firebaseUser) {
//    database.ref('firebaseUser/' + firebaseUser.uid).set(firebaseUser).catch(error => {
//        console.log(error.message)
//    });
//}


//get current users
//var user = firebase.auth().currentUser;
//if (user) {
    // User is signed in.
 //   console.log("user is login " + user);
 // } else {
    // No user is signed in.
  //  console.log("user is not login " + user);
 // }