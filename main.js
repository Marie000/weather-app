  var currentTemp;
  var currentWeather;
  var currentHumidity;




function Day(tempMax, tempMin,weather,icon,humidity,weekday,day,month,year) {
  this.tempMax = tempMax;
  this.tempMin = tempMin;
  this.weather = weather;
  this.icon = icon;
  this.humidity = humidity;
  this.weekday = weekday;
  this.day = day;
  this.month = month;
  this.year = year;
}


function getGeoLocation() {
 navigator.geolocation.getCurrentPosition(foundLocation);
}
function foundLocation(position) {
  var lat0 = position.coords.latitude;
  var long0 = position.coords.longitude;
  getCurrentWeather(lat0,long0);
  getForecast(lat0,long0);
}

function getCurrentWeather(latitude,longitude){
    var locationUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=8435ee76b6db93cc01f36ab65fd0649a";
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
 console.log(backgroundCode)
 switch(backgroundCode) {
  case "01d":
  case "01n":
  $('body').css('background-image','url("images/sunny.jpg")')
  break;

  case "04d":
  case "04n":
  $('body').css('background-image','url("images/clouds.jpg")')
  break;

  case "09d":
  case "09n":
  case "10d":
  case "10n":
  $('body').css('background-image','url("images/rain.jpg")')
  break;

  case "02d":
  case "02n":
  case "03d":
  case "03n":
  $('body').css('background-image','url("images/mixed.jpeg")')
  break;

  case "11d":
  case "11n":
  $('body').css('background-image','url("images/lightning.jpeg")')
  break;

  case "13d":
  case "13n":
  $('body').css('background-image','url("images/snow.jpg")')
  break;

  case "50d":
  case "50n":
  $('body').css('background-image','url("images/fog.jpg")')
  break;

 }
},
error: function(){
  $('#temperature').html("An error occured while retrieving weather info. Please reload.")
}
})
}

function getForecast(latitude,longitude){
  var locationUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitude+"&lon="+longitude+"&APPID=8435ee76b6db93cc01f36ab65fd0649a";

  $.ajax({
   url:locationUrl,
    type: 'GET',
    data: {},
    success: function(data) {
      console.log('success!')
    //get dates for forecast
    var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    function DateObject(day) {
      this.weekday = weekdays[day.getDay()];
      this.date = day.getDate();
      this.month = months[day.getMonth()];
      this.year = day.getFullYear();
    }

    var d = new Date();
    var day1Date = new DateObject(d)


    var d2= new Date(d.getTime()+1000*60*60*24);
    var day2Date = new DateObject(d2)

    var d3= new Date(d2.getTime()+1000*60*60*24);
    var day3Date = new DateObject(d3);

    var d4= new Date(d3.getTime()+1000*60*60*24);
    var day4Date = new DateObject(d4);

        var Day1 = new Day(data.list[0].temp.max,data.list[0].temp.min,
          data.list[0].weather[0].description,data.list[0].weather.icon,
          data.list[0].humidity,day1Date.weekday,day1Date.date,day1Date.month,day1Date.year);

        var Day2 = new Day(data.list[1].temp.max,data.list[1].temp.min,
          data.list[1].weather[0].description,data.list[1].weather.icon,
          data.list[1].humidity,day2Date.weekday,day2Date.date,day2Date.month,day2Date.year);

        var Day3 = new Day(data.list[2].temp.max,data.list[2].temp.min,
          data.list[2].weather[0].description,data.list[2].weather.icon,
          data.list[2].humidity,day3Date.weekday,day3Date.date,day3Date.month,day3Date.year);    

        var Day4 = new Day(data.list[3].temp.max,data.list[3].temp.min,
          data.list[3].weather[0].description,data.list[3].weather.icon,
          data.list[3].humidity,day4Date.weekday,day4Date.date,day4Date.month,day4Date.year);    

        $("#day1Date").html(Day1.weekday+", "+Day1.month+" "+Day1.day+" "+Day1.year);
        $("#day1Max").html(Math.round(Day1.tempMax-273)+"C");
        $("#day1Min").html(Math.round(Day1.tempMin-273)+"C");
        $("#day1Weather").html(Day1.weather);

        $("#day2Date").html(Day2.weekday+", "+Day2.month+" "+Day2.day+" "+Day2.year)
        $("#day2Max").html(Math.round(Day2.tempMax-273)+"C");
        $("#day2Min").html(Math.round(Day2.tempMin-273)+"C");
        $("#day2Weather").html(Day2.weather);

        $("#day3Date").html(Day3.weekday+", "+Day3.month+" "+Day3.day+" "+Day3.year)
        $("#day3Max").html(Math.round(Day3.tempMax-273)+"C");
        $("#day3Min").html(Math.round(Day3.tempMin-273)+"C");
        $("#day3Weather").html(Day3.weather);

        $("#day4Date").html(Day4.weekday+", "+Day4.month+" "+Day4.day+" "+Day4.year)
        $("#day4Max").html(Math.round(Day4.tempMax-273)+"C");
        $("#day4Min").html(Math.round(Day4.tempMin-273)+"C");
        $("#day4Weather").html(Day4.weather);

        },
    error: function(){
      $('#forecast-title').html("An error occured while retrieving weather info. Please reload.")
    }
  });
}
getGeoLocation();  

