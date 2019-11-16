# Project-1-Team-04
![Giphygif](1.gif)

# Summary


Our project is a online news aggregator.
News Breeze will be a single stop for all your news requirements to accompany your coffee. 
It will provide top headlines from multiple news outlets and sources, when you visit our site. 
If you don't like what you see,use our search and preferences options to get the news tailored to your requirements.
It also gives you updates about the local weather.


## Technologies used:
HTML
CSS
BOOTSTRAP
JAVASCRIPT
Jquery
Firebase for database and authentication

Link to project - [News Breeze](https://shiprad25.github.io/Project-1-Team-04/)


# News Breeze Logo
'''html

    <div class="logo"> 
        <a href="index.html">
            <img src="assets/images/logo.png" alt="News Breeze">
        </a> 
    </div>
    '''
# The code for on click of submit button
   '''javascript
    // on click of submit button function will check the search parameters and results is displayed in the page
    $("#submit").click(function(){
        var search = $("#search").val().trim();
        console.log("SearchTerm: ",search);
        queryURL ="https://newsapi.org/v2/everything?pageSize=10&q="+search+"&apiKey=349152e2740748f4b23c31609ae25dae";
        console.log("Query URL : ",queryURL);
        $(".row").empty();
        query();
    });
'''

# Function code that generates dynamic columns
'''
function(response){
        var results = response.articles;
        console.log(results);
        for(var i =0;i<results.length;i++){
            var title = results[i].title;
            console.log(title);
            var content = results[i].description; //brief description of the news
            var newsUrl = results[i].url; //link to the news on the news site
            var imageUrl = results[i].urlToImage; //link to the news image;
            var myCol = $('<div class="grow col-sm-3 col-md-3 col-xs-12" id="col'+i+'"></div>'); //make a column
            var card = $('<div class="card " id="'+i+'col">');
            var cardHeader = $('<div class="card-header"><img src="'+imageUrl+'" class="card-img-top"></div>'
            var cardBody= $('<div class="card-body">');
            var cardTitle = $('<div class="card-title"><h5>'+title+'</h5>')
            var cardText = $ ('<div class="card-text">').text(content);
             var readMore = $('<div><span class="read"><a class= "read" href="'+newsUrl+'">Read more..</a></span></div><div class="action-container">'+
            '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal'+ i +'">' +
            '  share' +
            '</button>' +
            '<div class="modal fade" id="exampleModal'+ i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
            '  <div class="modal-dialog" role="document">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header">' +
            '        <h5 class="modal-title" id="exampleModalLabel">Share</h5>' +
            '      </div>' +
            '      <div class="modal-body">' +
            '      <a class="twitter-share-button"href="https://twitter.com/intent/tweet?text=' + newsUrl + '">Tweet</a>' + '<br/>' +
            '<a href="mailto:?subject=' + title + '&body=' + newsUrl + '"target="_blank" class="share-btn email">Mail</a></a>' +
            //'<a href="mailto:?subject=<SUBJECT>&body=<BODY>"target= newsUrl  class="share-btn email">Mail</a>' +
            '</div>' +
            '<div class="modal-footer">' +
            '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '</div>');
            card.append(cardHeader);
            // cardHeader.append(cardImage);
            cardHeader.append(cardTitle);
            cardTitle.append(cardText);
            cardText.append(readMore);
            myCol.append(card);
                $(".row").append(myCol);
            $('.close').on('click', function(e){
                e.stopPropagation();  
                var $target = $(this).parents('.col-sm-3');
                $target.hide('slow', function(){ $target.remove(); });
            });
            $(".read").click(function(e){
                e.stopPropagation(); 
                window.open(newsUrl,'_blank');
            })
        }
    });
}
    '''
    code to initalizing firebase.
    '''
    var firebaseConfig = {
        apiKey: "AIzaSyCo4xVWn7Ypizk-6VB6XjTeb2ewiqaryic",
        authDomain: "projectone-cbac5.firebaseapp.com",
        databaseURL: "https://projectone-cbac5.firebaseio.com",
        projectId: "projectone-cbac5",
        storageBucket: "projectone-cbac5.appspot.com",
        messagingSenderId: "31129312771",
        appId: "1:31129312771:web:8a5072bcf95acf7dfcf836"
    };        
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    //make auth and firestore reference
    const auth = firebase.auth();
    const db = firebase.firestore();
    '''

# Query url for pollen

    ```javascript
 
 function callpollen(ip) {
       var queryURL = "https://api.waqi.info/feed/here/?token=12f820d56fa3fd40bd4af15eae5097c9875e7bc5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        var weatherPollenAQI = response.data.aqi;
        console.log(weatherPollenAQI);
        $("#pollen").append(JSON.stringify(response.data.aqi));
        $("#pollen").append(notes);   
    })
}
'''
# Weather
``` javascript
const loc = document.getElementById("location");
const temNum = document.getElementById("temperature-num");
const temScale = document.getElementById("temperature-scale");
const weatherCon = document.getElementById("weather-condition");
const weatherIcon = document.getElementById("weather-icon");
// get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}
```
 # Get weather data according to the location
 ```javascript
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}
// update the data from API to DOM
function updateDataToUI(location, weather, temp) {
  weatherImage=$('<div class="weather"><img src="'+ weather[0].icon +'" /></div><br>');
  weatherTemp= $('<div class="weather">'+ temp + '</div>');
  weatherLocation= $('<div class="weather">'+ location + '</div>');
  $('#weather').append(weatherLocation);
  $('#weather').append(weatherImage);
  $('#weather').append(weatherTemp);  
}
window.onload = function() {
  getLocation();
};
```
# Sign In
'''javascript
btnLogin.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    
  });
  '''
  # Sign UP
  '''javascript
  btnSignup.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass); 
    $("#loginState").html("<br>One user is now signed up!");      
});
'''
# Authentication
'''javasript
var x = document.getElementById("myDIV");

//add a realtiem lister for auth state change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        $("#loginState").html("<br>user is now login!");
        setTimeout(function () {
          window.location.href = "./index.html";}, 2000); //will call the function after 2 secs.
        console.log(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION));
    } else {
        $("#loginState").html("<br>");
    }
});

# Challenges faced

Modals because of their fixed position.

Dynamic database creation after authentication.

Code integration.

# Lessons Learned
- Integration and regression testing to be done consistently
- Better research on some topics
- More modular code
- Responsive design could be better
- Make the presentation sharper

