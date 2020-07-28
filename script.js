var city = $('.search-field').val();
var cities = [''];

var APIKey = '7439220f89767ecc92468da6aaab2380'

$('.searchBtn').on('click', function () {
    var currentDate = moment().format('M/DD/YYYY');
    city = $('.search-field').val();
   $('.search-field').val('');

    
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    + city + '&units=imperial' + '&appid=7439220f89767ecc92468da6aaab2380';
    

   $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    .then(function(response){
        console.log(response.weather[0].icon);
        var icon = 'https://api.openweathermap.org/img/w/' + response.weather[0].icon + '.png';
        console.log(response);
    $('.city-name').html('<h1>' + response.name + '<img src=' + icon + '>' + '</h1>');
    $('.currentDate').text(moment().format('M/DD/YYYY'));
    $('#temp').text('Temperature: ' + response.main.temp + '°F');
    $('#humidity').text('Humidity: ' + response.main.humidity + '%');
    $('#wind').text('Wind Speed: ' + response.wind.speed + 'MPH');
    
    var cities = JSON.parse(localStorage.getItem(cities)) || [];
    cities.push(city);
    var newCities = JSON.stringify(cities);
    localStorage.setItem('cities', newCities);
    })
    
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=7439220f89767ecc92468da6aaab2380';
    
    $('.5Day-Forecast').html('<h1>5-Day Forecast:</h1>');

    $.ajax({
        url: queryUrl,
        medthod: 'GET'
    })
    .then(function(response){
        console.log(response);
        $('.Day-1').text(moment().format('M/DD/YYYY'));
        $('.Day1').text('Temperature: ' + response.data.list[5].main.temp + '°F');
        $('.Day1').text('Humidity: ' + response.data.list[5].main.humidity + '%');
    })
})

