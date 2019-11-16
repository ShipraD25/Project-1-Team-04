# Project-1-Team-04
Technologies used:
HTML
CSS
BOOTSTRAP
TACHYONS
JAVASCRIPT
Jquery
moment (firebase database)

Link to project - [News Breeze](https://shiprad25.github.io/Project-1-Team-04/)

Html header
'''
<div class="jumbotron">
    <div class="logo"> 
        <a href="index.html">
            <img src="assets/images/logo.png" alt="News Breeze">
        </a> 
    </div>
    <!-- nav box has search box, signin or register for the first time which leads to a different page
    and  option dropdown to select how many articles should be displayed from 1-15
    default is 5  -->
     <nav class="nav-box">
        <input class="search" placeholder="search">
        <a class="signin" href="loginSignin.html">Sign in/Sign up</a>
        <a class="signout" href="logout.html">Log out</a>
        
        <button class= "button" type="submit">Submit</button>
    </nav>
</header>
<div class="header-ext">
<div class="announcement">
    News Breeze let's you pick the news from specific sites and also share and personalize your favourite articles.
</div>
</div>
  </div>
  '''

  html footer
  ,,,
  <footer>
        <!-- Displays the logo in the front page -->
        <div class="logo"> 
            <a href="index.html">
                <img src="assets/images/logo.png" alt="News Breeze">
            </a> 
        </div>
        <!-- nav box has search box, signin or register for the first time which leads to a different page
        and  option dropdown to select how many articles should be displayed from 1-15
        default is 5  -->
         <nav class="nav-box">
                <h3 style= "text-align:center;">Visitors have clicked on news tiles <span id="click-value" style="color:red;"></span> times!</h3>
        </nav>
    </footer>  
    '''

    the code for on click of submit button
    '''
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

function code that generates dynamic columns
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
            console.log("URL: ",newsUrl);
            console.log("Brief Description: ", content);
            console.log("Image URL: ",imageUrl)
            var myCol = $('<div class="grow col-sm-3 col-md-3 col-xs-12" id="col'+i+'"></div>'); //make a column
            var card = $('<div class="card " id="'+i+'col">');
            var cardHeader = $('<div class="card-header"><img src="'+imageUrl+'" class="card-img-top"></div>')
            // var cardImage = $('<img src="'+imageUrl+'" class="card-img-top" style="height:20px;width:10px;"><br>')
            var cardBody= $('<div class="card-body">');
            var cardTitle = $('<div class="card-title"><h5>'+title+'</h5>')
            var cardText = $ ('<div class="card-text">').text(content);
            var readMore = $('<div><span class="read"><a class= "read" href="'+newsUrl+'">Read more..</a></span></div><div class="action-container"><a href="" class="far fa-bookmark"></a><a href="" class="far fa-share-square"></a></div>');
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
      
        // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    //make auth and firestore reference
    const auth = firebase.auth();
    const db = firebase.firestore();
    '''

    query url for pollen
    ```
 function callpollen(ip) {
       
    var queryURL = "https://api.waqi.info/feed/here/?token=12f820d56fa3fd40bd4af15eae5097c9875e7bc5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        var weatherPollenAQI = response.data.aqi;
        console.log(weatherPollenAQI);
        if(weatherPollenAQI <=50){
             var notes= $('<div class="good">Good</div>');
         }else if(weatherPollenAQI >50 && weatherPollenAQI <=100){
             var notes= $('<div class="moderate">Moderate</div>');
         }else if(weatherPollenAQI >100 && weatherPollenAQI <=150){
             var notes= $('<div class="unhealthySen">Unhealthy for sensative groups</div>');
         }else if(weatherPollenAQI >150 && weatherPollenAQI <=200){
             var notes= $('<div class="unhealthy">Unhealthy</div>');
         }else if(weatherPollenAQI >200 && weatherPollenAQI <=300){
             var notes= $('<div class="veryUnhealthy">Very Unhealthy</div>');
         }else if(weatherPollenAQI >300 && weatherPollenAQI <=500){
             var notes= $('<div class="hazardous">Hazardous</div>');
         }
        $("#pollen").append(JSON.stringify(response.data.aqi));
        $("#pollen").append(notes);
        
    })
}
```

weather
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
// get weather data according to the location
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
//   weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
//   weatherCon.innerHTML = weather[0].main;
//   loc.innerHTML = location;
//   temNum.innerHTML = `${temp}`;
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