//const database = firebase.database()
//const createUser = user => database.ref().child(`User/${user.uid}`).set(user)


  //get elements from the DOM

  const btnLogout = document.getElementById("btnLogout");

  //add login event. 
  //read this: https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc
  //document.getElementById("btnLogin").addEventListener("click", e => {
  

  //add signup event
  

//add a logout fucntion
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    console.log("logout clicked");
    x.style.display = "none";
    //window.location = 'auth.html';
    //myFunction();
    //window.location = "index.html";
    setTimeout(function () {
      window.location.href = "./index.html";}, 2000); //will call the function after 2 secs.
});

var x = document.getElementById("myDIV");
var y = document.getElementById("btnLogout");
//var time = moment().toDate();


//add a realtiem lister for auth state change



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

 //hide an element if user is not login


//try to use authentication state as a variable 




  //set redirect timeout
//setTimeout(function () {
//    window.location.href = "./index.html"; //will redirect to your blog page (an ex: blog.html)
// }, 2000); //will call the function after 2 secs.