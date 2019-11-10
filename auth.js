

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
    //promise.catch(e => console.log(e.message));
    //$("#loginState").html("<br>you are now signed up!");

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
        console.log(firebaseUser);
        //make logout btn visiable after user login
        btnLogout.classList.remove("hide");
        $("#loginState").html("<br>you have now login!");
        
    } else {
        console.log("state change, Not log in");
        //make logout btn invisiable if user not login
        btnLogout.classList.add("hide");
        $("#loginState").html("<br>you are not login!");

    }
});