console.log('main.js is connected!');

/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/
//var cityNameArray = [];
//var count = 0;

$(document).ready(function() {
    console.log('script loaded')

    //EVENTLISTNER
    $("#submit").click(makeCall)
        // Our apiKey is: 974c49846451be7321f8e80b69d91954

    //FUNCTION ADD AJAX CALL FOR OPENWEATHER API
    function makeCall() {
        let url = "http://api.openweathermap.org/data/2.5/forecast?zip=";
        let zip = $('#zip').val();
        let apiKey = ",us&units=imperial&appid=974c49846451be7321f8e80b69d91954";

        let total = url + zip + apiKey;
        //total = "http://api.openweathermap.org/data/2.5/forecast?zip=18914,us&units=imperial&appid=974c49846451be7321f8e80b69d91954";

        /*let url = "http://api.openweathermap.org/data/2.5/weather?zip=";
        let zip = $('#zip').val();
        let apiKey = ",us&units=imperial&appid=974c49846451be7321f8e80b69d91954";
        let total = url + zip + apiKey;*/

        //console.log(apiKey)
        //console.log(zip)
        //cityNameArray[count++] = data.city.name;

        $.getJSON(total, function(data) {
            getData(data)
                //getOverallData(data);
        });
    }

    //GRAB THE DATA
    var getData = function(data) {
        // console.log(data);
        // console.log('inside getData', data.main.temp_min);
        // console.log('inside getData', data.main.temp_max);
        // console.log('inside getData', data.main.temp);
        // console.log('inside getData', data.name);
        // console.log('inside getData', data.weather[0].description);
        var location = data.city.name;
        var temp = data.list[0].main.temp.toFixed();
        var desc = data.list[0].weather[0].description;
        var minTemp = data.list[0].main.temp_min.toFixed();
        var maxTemp = data.list[0].main.temp_max.toFixed();

        var country = data.city.country;
        var latitude = data.city.coord.lat.toFixed();
        var longitude = data.city.coord.lon.toFixed();

        var realFeel = data.list[0].main.feels_like.toFixed();
        var seaLevel = data.list[0].main.sea_level.toFixed();
        var humidity = data.list[0].main.humidity.toFixed();

        var date = data.list[0].dt_txt;

        var date2 = data.list[7].dt_txt;
        var temp2 = data.list[7].main.temp.toFixed();
        var desc2 = data.list[7].weather[7].description;
        var realFeel2 = data.list[7].main.feels_like.toFixed();
        var humidity2 = data.list[7].main.humidity.toFixed();
        var minTemp2 = data.list[7].main.temp_min.toFixed();
        var maxTemp2 = data.list[7].main.temp_max.toFixed();



        //images changes depending on the temp
        if (temp > 90) {
            $('.imageWrapper').addClass('wrapper_hot');
        } else if (temp > 41 && temp < 89) {
            $('.imageWrapper').addClass('wrapper_normal');
        } else if (temp < 40) {
            $('.imageWrapper').addClass('wrapper_cold');
        }
        manipulateDom(location, temp, desc, minTemp, maxTemp, country, latitude, longitude,
            realFeel, seaLevel, humidity, date, date2, temp2, desc2, minTemp2, maxTemp2, realFeel2, humidity2);
    }

    /*var getOverallData = function(data) {
        var location = data.city.name;

        manipulateDom(location, temp, desc, minTemp, maxTemp, country, latitude, longitude, realFeel, seaLevel, humidity, date);
    }*/


    //Displays returned info in the Dom
    var manipulateDom = function(location, temp, desc, minTemp, maxTemp, country, latitude, longitude, realFeel,
        seaLevel, humidity, date, date2, temp2, desc2, minTemp2, maxTemp2, realFeel2, humidity2) {
        // console.log('inside manipulateDom');
        $('#location').html("City: " + location);
        $('#temp').html(temp + "&deg");
        $('#desc').html("\nCurrent Weather: " + desc);
        $('#minTemp').html("Min. Temp: " + minTemp + "&deg");
        $('#maxTemp').html("Max. Temp: " + maxTemp + "&deg");

        $('#country').html("Country: " + country + "\n");
        $('#latitude').html("Latitude: " + latitude + "&deg");
        $('#longitude').html("Longitude: " + longitude + "&deg");
        $('#realFeel').html("Real Feel: " + realFeel + "&deg");
        $('#seaLevel').html("Sea Level: " + seaLevel + " feet");
        $('#humidity').html("Humidity: " + humidity + "%");
        $('#date').html(date);

        $('#date').html(date2);
        $('#temp').html(temp2 + "&deg");
        $('#desc').html("\nCurrent Weather: " + desc2);
        $('#minTemp').html("Min. Temp: " + minTemp2 + "&deg");
        $('#maxTemp').html("Max. Temp: " + maxTemp2 + "&deg");
        $('#realFeel').html("Real Feel: " + realFeel2 + "&deg");
        $('#humidity').html("Humidity: " + humidity2 + "%");
    }

    //animate display
    $("#submit").click(function() {
        $(".navlarge").addClass("navsmall", 5000, "easeOut");
    });

    //submit on enter
    $(document).on('keyup', function(e) {
        var key = e.which;
        if (key == 13) {
            $("#submit").click();
        }
    });

})