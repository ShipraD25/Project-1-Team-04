
  //get elements from the DOM
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignup = document.getElementById("btnSignup");
  //const btnLogout = document.getElementById("btnLogout");

  //add login event. 
  
  btnLogin.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    
  });

  //add signup event
  btnSignup.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    
    $("#loginState").html("<br>One user is now signed up!");
    
    
});

//add a logout fucntion

var x = document.getElementById("myDIV");

//add a realtiem lister for auth state change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log("state change, login is successful");
        console.log("firebaseUser is: " + firebaseUser);
        console.log("firebaseUser email is: " + firebaseUser.email);
        console.log("firebaseUser uid is: " + firebaseUser.uid);

        $("#loginState").html("<br>user is now login!");
        //writeUserData(firebaseUser);
        x.style.display = "block";
        //window.location = "./index.html";
        setTimeout(function () {
          window.location.href = "./index.html";}, 2000); //will call the function after 2 secs.

        //y.style.display = "block";
        console.log(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION));

    } else {
        console.log("state change, Not log in");
        //make logout btn invisiable if user not login
        //btnLogout.classList.add("hide");
        x.style.display = "none";
        //y.style.display = "block";
        $("#loginState").html("<br>");

    }
});


 //hide an element if user is not login
 function myFunction() {
    var x = document.getElementById("myDIV");
    if (firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION) != null && x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

//try to use authentication state as a variable 


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  //set redirect timeout
//setTimeout(function () {
//    window.location.href = "./index.html"; //will redirect to your blog page (an ex: blog.html)
// }, 2000); //will call the function after 2 secs.