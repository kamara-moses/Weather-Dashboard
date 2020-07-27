var city = $('.search-field').val();

var APIKey = '7439220f89767ecc92468da6aaab2380'

$('.searchBtn').on('click', function () {
    city = $('.search-field').val();
   $('.search-field').val('');

   
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    + city + "&units=imperial" + '&appid=7439220f89767ecc92468da6aaab2380';
   $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    .then(function(response){
        console.log(response);
    $('.city-name').html('<h1>' + response.name + ' Weather</h1>');
    $('.temp').text('Humidity: ' + response.main.humidity + '%');
    console.log('Temperature (K) ' + response.main.temp + '•F');
    $('.temp').text('Temperature (K) ' + response.main.temp + '°F');
    $('.temp').text('Wind Speed: ' + response.wind.speed + 'MPH');
    })
})
