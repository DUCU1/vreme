window.addEventListener('load', ()=> {
    var long;
    var lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7605e81bdd84bf03a470f65e7f73769e`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    drawWeather(data);
                })
                .catch(function(){

                });
        });
    }
});

function drawWeather(d){
    var celsius = Math.round(parseFloat(d.main.temp)-273.15);
    var a = d.weather[0].main;
    const img = document.querySelector('img');

    document.getElementById('temp').innerHTML = celsius + '&deg' ;
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('location').innerHTML = d.name;

    if(a.indexOf('Thunderstorm') > -1){
        document.body.className='thunderstorm';
        img.setAttribute('src', './Img/thunderstorm.png');
    } else if(a.indexOf('Drizzle') > -1){
        document.body.className='drizzle';
        img.setAttribute('src', './Img/drop.png');
    }else if(a.indexOf('Rain') > -1){
        document.body.className='rain';
        img.setAttribute('src', './Img/rain.png');
    }else if(a.indexOf('Snow') > -1){
        img.setAttribute('src', './Img/snowflake.png');
        document.body.className='snow';
    }else if(a.indexOf('Atmosphere') > -1){
        document.body.className='fog';
        img.setAttribute('src', './Img/haze.png');
    }else if(a.indexOf('Clear') > -1){
        document.body.className='clear';
        img.setAttribute('src', './Img/sun.png');
    }else if(a.indexOf('Clouds') > -1){
        document.body.className='clouds';
        img.setAttribute('src', './Img/cloud.png');
    }
}