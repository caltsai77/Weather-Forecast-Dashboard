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

$(document).ready(function() {
  console.log('script loaded')

//EVENTLISTNER
 $("#submit").click(makeCall)

//FUNCTION ADD AJAX CALL FOR OPENWEATHER API
  function makeCall(){
    let url = "http://api.openweathermap.org/data/2.5/weather?zip=";
    let zip = $('#zip').val();
    let apiKey = ",us&units=imperial&appid=876f71af64d39434b74d05b31a77fc42";
    let total = url + zip + apiKey;
    // console.log(apiKey)
    // console.log(zip)


    $.getJSON(total, function(data) {
      getData(data)
    });
  }

  //GRAB THE DATA
  var getData = function (data){
    // console.log(data);
    // console.log('inside getData', data.main.temp_min);
    // console.log('inside getData', data.main.temp_max);
    // console.log('inside getData', data.main.temp);
    // console.log('inside getData', data.name);
    // console.log('inside getData', data.weather[0].description);
    var location= data.name;
    var temp=data.main.temp.toFixed();
    var desc =data.weather[0].description;
    var minTemp = data.main.temp_min.toFixed();
    var maxTemp = data.main.temp_max.toFixed();

    //images changes depending on the temp
    if(temp > 90){
      $('.imageWrapper').addClass('wrapper_hot');
      }else if
      (temp > 41 && temp < 89){
      $('.imageWrapper').addClass('wrapper_normal');
      }else if
      (temp < 40){
      $('.imageWrapper').addClass('wrapper_cold');
      }
      manipulateDom(location, temp, desc, minTemp, maxTemp)
  }


//Displays returned info in the Dom
  var manipulateDom = function(location, temp, desc, minTemp, maxTemp){
   // console.log('inside manipulateDom');
    $('#location').html(location);
    $('#temp').html(temp + "&deg");
    $('#desc').html(desc);
    $('#minTemp').html(minTemp + "&deg");
    $('#maxTemp').html(maxTemp + "&deg");
  }

//animate display
  $( "#submit" ).click(function() {
    $(".navlarge").addClass("navsmall", 5000, "easeOut");
  });

//submit on enter
  $(document).on('keyup', function(e){
      var key = e.which;
      if(key == 13)
      {
         $("#submit").click();
      }
  });

  })




