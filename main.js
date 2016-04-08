  var currentTemp;
  var currentWeather;
  var currentHumidity;

function Day(tempMax, tempMin,weather,icon,humidity) {
  this.tempMax = tempMax;
  this.tempMin = tempMin;
  this.weather = weather;
  this.icon = icon;
  this.humidity = humidity;
}


function getGeoLocation() {
 navigator.geolocation.getCurrentPosition(foundLocation);
}
function foundLocation(position) {
  var lat0 = position.coords.latitude;
  var long0 = position.coords.longitude;
  getCurrentWeather(lat0,long0);
  getForecast(lat0,lon0);
}

function getCurrentWeather(latitude,longitude){
    locationUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=8435ee76b6db93cc01f36ab65fd0649a";
  $.ajax({
   url:locationUrl,
    type: 'GET',
    data: {},
    success: function(data) {
// thing
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
        //$('.weather').html(JSON.stringify(data));

var location = (data.name).replace(/"/g,"");   
$('#location').html(location);

var temperature = (data.main.temp)-273;      
$('#temperature').html(Math.round(temperature)+"C");

var main = (data.weather[0].main).replace(/"/g, "");
$('#main').html(main);
      
$('#humidity').html("humidity: "+JSON.stringify(data.main.humidity)+"%")
      
 //background
 
 var backgroundCode = (data.weather[0].icon);
}
})
}

function getForecast(latitude,longitude){
  locationUrl = 
  "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitude+"&lon="+longitude+"&APPID=8435ee76b6db93cc01f36ab65fd0649a";

  $.ajax({
   url:locationUrl,
    type: 'GET',
    data: {},
    success: function(data) {

        },
  });
}
getGeoLocation();  

