//query url for pollen

function callpollen(ip) {
       
    var queryURL = "https://api.waqi.info/feed/here/?token=12f820d56fa3fd40bd4af15eae5097c9875e7bc5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        var weatherPollenAQI = response.data.aqi;
        console.log(weatherPollenAQI);
        //Different ranges for AQI (air quality index)
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
callpollen()

//Populate the home page with headlines
//Using the headlines query url, this is for only the population of the home page
var queryURL = "https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&apiKey=349152e2740748f4b23c31609ae25dae";
$(document).ready (function(){       
   query();
    });

// on click of submit button function will check the search parameters and results is displayed in the page
$("#submit").click(function(){
    var search = $("#search").val().trim();
    console.log("SearchTerm: ",search);
    queryURL ="https://newsapi.org/v2/everything?pageSize=10&q="+search+"&apiKey=349152e2740748f4b23c31609ae25dae";
    console.log("Query URL : ",queryURL);
    $(".row").empty();
    query();
});

    
function query(){
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

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
            var myCol = $('<div class="col-sm-6 col-md-3 col-xs-12" id="col'+i+'"></div>'); //make a column
            var card = $('<div class="card" id="'+i+'col">');
            // image appended to the card
            var cardHeader = $('<div class="card-header"><img src="'+imageUrl+'" class="card-img-top"></div>')
            // var cardImage = $('<img src="'+imageUrl+'" class="card-img-top" style="height:20px;width:10px;"><br>')
            var cardBody= $('<div class="card-body">');
            var cardTitle = $('<div class="card-title"><h5>'+title+'</h5>')
            var cardText = $ ('<div class="card-text">').text(content);
            var readMore = $('<div><span class="read"><a class= "read" href="'+newsUrl+'">Read more..</a></span></div><div class="action-container">'+
            '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +
            '  share' +
            '</button>' +
            '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
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
//weather
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
  weatherTemp= $('<div class="weather">'+ temp + ' &#8451</div>');
  weatherLocation= $('<div class="weather">'+ location + '</div>');
  $('#weather').append(weatherLocation);
  $('#weather').append(weatherImage);
  $('#weather').append(weatherTemp);
  
}
window.onload = function() {
  getLocation();
};

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
//Counter to  keep count of number of clicks done by the user.

//counter when user click on any part of the main content
var clickCounter = 0;
$("#main-content").on("click", function() {
// Add to clickCounter
clickCounter++;
//  Store Click Data to Firebase in a JSON property called clickCount
// Note how we are using the Firebase .set() method
database.ref().set({
  clickCount: clickCounter
});
});
//counter snapshot codes
database.ref().on("value", function(snapshot) {
// Then we console.log the value of snapshot
console.log(snapshot.val());
// Update the clickCounter variable with data from the database.
clickCounter = snapshot.val().clickCount;
// Then we change the html associated with the number.
$("#click-value").text(clickCounter);
// If there is an error that Firebase runs into -- it will be stored in the "errorObject"
// Again we could have named errorObject anything we wanted.
}, function(errorObject) {
// In case of error this will print the error
console.log("The read failed: " + errorObject.code);
});



