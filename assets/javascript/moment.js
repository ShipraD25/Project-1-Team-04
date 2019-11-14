
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
            var myCol = $('<div class="grow col-sm-3 col-md-3 col-xs-12" id="col'+i+'"></div>'); //make a column
            var card = $('<div class="card " id="'+i+'col">');
            var cardHeader = $('<div class="card-header"><img src="'+imageUrl+'" class="card-img-top"></div>')
            // var cardImage = $('<img src="'+imageUrl+'" class="card-img-top" style="height:20px;width:10px;"><br>')
            var cardBody= $('<div class="card-body">');
            var cardTitle = $('<div class="card-title"><h5>'+title+'</h5>')
            var cardText = $ ('<div class="card-text">').text(content);
            var readMore = $('<div><span class="read"><a class= "read" href="'+newsUrl+'">Read more..</a></span></div><div class="action-container"><a href="" class="far fa-bookmark"></a>'+
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
  weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
  weatherCon.innerHTML = weather[0].main;
  loc.innerHTML = location;
  temNum.innerHTML = `${temp}`;
}
window.onload = function() {
  getLocation();
};