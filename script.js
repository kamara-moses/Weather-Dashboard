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
        .then(function (response) {
            var icon = 'https://api.openweathermap.org/img/w/' + response.weather[0].icon + '.png';
            console.log(response);
            $('.city-name').html('<h1>' + response.name + '<img src=' + icon + '>' + '</h1>');
            $('.currentDate').text(moment().format('M/DD/YYYY'));
            $('#temp').text('Temperature: ' + response.main.temp + '°F');
            $('#humidity').text('Humidity: ' + response.main.humidity + '%');
            $('#wind').text('Wind Speed: ' + response.wind.speed + 'MPH');

            var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=' + response.coord.lat + "&lon=" + response.coord.lat;
            $.ajax({
                url: uvUrl,
                method: 'GET'
            }).then(function (uvresponse) {

                var uvIndex = uvresponse.value;
                var uvColor = '';
                if (uvIndex < 3) {
                    uvCcolor = 'green';
                } else if (uvIndex < 6) {
                    uvColor = 'yellow';
                } else if (uvIndex < 8) {
                    uvColor = 'orange'
                } else if (uvIndex < 11) {
                    uvColor = 'red';
                } else {
                    uvColor = 'violet';
                }
                $('#uv-index').text('Uv-Index: ' + uvIndex);
                $('#uv-index').attr('style', 'background-color: ' + uvColor);
            });
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
        .then(function (response) {
            console.log(response);
            var icon1 = 'http://openweathermap.org/img/w/' + response.list[2].weather[0].icon + '.png';
            var icon2 = 'http://openweathermap.org/img/w/' + response.list[10].weather[0].icon + '.png';
            var icon3 = 'http://openweathermap.org/img/w/' + response.list[18].weather[0].icon + '.png';
            var icon4 = 'http://openweathermap.org/img/w/' + response.list[26].weather[0].icon + '.png';
            var icon5 = 'http://openweathermap.org/img/w/' + response.list[34].weather[0].icon + '.png';
            $('#first #Date1').text(response.list[2].dt_txt);
            $('#first #icon1').html('<img src=' + icon1 + '>')
            $('#first #temp1').text('Temp: ' + ((response.list[2].main.temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F');
            $('#first #humidity1').text('Humidity: ' + response.list[2].main.humidity);

            $('#second #icon2').html('<img src=' + icon2 + '>')
            $('#second #temp2').text('Temp: ' + ((response.list[10].main.temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F');
            $('#second #humidity2').text('Humidity: ' + response.list[10].main.humidity);

            $('#third #icon3').html('<img src=' + icon3 + '>')
            $('#third #temp3').text('Temp: ' + ((response.list[18].main.temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F');
            $('#third #humidity3').text('Humidity: ' + response.list[18].main.humidity);

            $('#fourth #icon4').html('<img src=' + icon5 + '>')
            $('#fourth #temp4').text('Temp: ' + ((response.list[26].main.temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F');
            $('#fourth #humidity4').text('Humidity: ' + response.list[26].main.humidity);

            $('#fifth #icon5').html('<img src=' + icon5 + '>')
            $('#fifth #temp5').text('Temp: ' + ((response.list[34].main.temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F');
            $('#fifth #humidity5').text('Humidity: ' + response.list[34].main.humidity);
            
        })
})

