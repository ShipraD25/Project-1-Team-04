
  //get elements from the DOM

  const btnLogout = document.getElementById("btnLogout");
  

//add a logout fucntion
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    console.log("logout clicked");
    x.style.display = "none";
    
    setTimeout(function () {
      window.location.href = "./index.html";}, 2000); //will call the function after 2 secs.
});

var x = document.getElementById("myDIV");
var y = document.getElementById("btnLogout");
