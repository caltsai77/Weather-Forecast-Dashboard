$(document).ready(function() {
    console.log('script loaded')

    // Enter Zip Code
    $("#submit").click(makeCall)
        // Our apiKey is: 974c49846451be7321f8e80b69d91954

    // Call to Open Weather API
    function makeCall() {
        let url = "http://api.openweathermap.org/data/2.5/forecast?zip=";
        let zip = $('#zip').val();
        let apiKey = ",us&units=imperial&appid=974c49846451be7321f8e80b69d91954";

        let total = url + zip + apiKey;

        // Call to access JSON file, assign data to vars
        $.getJSON(total, function(data) {
            getData(data)
        });
    }

    // Assign data in JSON file to vars
    var getData = function(data) {

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

        // Change image background based on current temperature
        if (temp > 90) {
            $('.imageWrapper').addClass('wrapper_hot');
        } else if (temp > 41 && temp < 89) {
            $('.imageWrapper').addClass('wrapper_normal');
        } else if (temp < 40) {
            $('.imageWrapper').addClass('wrapper_cold');
        }
        manipulateDom(location, temp, desc, minTemp, maxTemp, country, latitude, longitude, realFeel, seaLevel, humidity, date);
    }

    //Displays returned info in the DOM via HTML ID assignments
    var manipulateDom = function(location, temp, desc, minTemp, maxTemp, country, latitude, longitude, realFeel, seaLevel, humidity, date) {
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
    }

    // Move Zip Code input box (nav bar) to top right
    $("#submit").click(function() {
        $(".navlarge").addClass("navsmall", 5000, "easeOut");
    });

    //Submit on enter
    $(document).on('keyup', function(e) {
        var key = e.which;
        if (key == 13) {
            $("#submit").click();
        }
    });

})