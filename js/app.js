

// ELEMENT - Här selectas alla element som vi kommer att ha användning av
let button = document.querySelector('#submit');
let inputValue = document.querySelector('#user-input');
let name = document.querySelector('.city-name');
let description = document.querySelector('.description');
let icon = document.querySelector('.weather-icon');
let temperature = document.querySelector('.temperature');
let windSpeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');

// API - Som all data kommer att hämtas från
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&units=metric&lang=se&appid=16065d99458876a6807e4ee2cc35107c';

// EVENTLISTENER - När man trycker på 'submit' så kommer då apin att hämtas med fetch, 
// eventlistenern ligger då på knappen submit.
button.addEventListener('click', function(event) {
  console.log(inputValue.value);
  fetch(baseUrl + inputValue.value + apiKey).then(
    function (response) {
      console.log(response)

      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      //statuskod 404 "not found" kommer vi hantera som ett error
      // i vårt fall betyder det att staden inte kunde hittas
      else if (response.status === 404) {
        throw 'The city cannot be found';
      }

      //statuskod 401 "unauthorized" kommer också hanteras som ett error
      // i detta fall betyder det att api nyckeln är fel
      else if (response.status === 401) {
        throw response.statusText;
      }
    }
  )
  // .then och function data, här väljer vi vad vi ska göra med all data som vi hämtar från apin.
  // först väljer vi var vi hämtar datan ifrån och sedan vart vi ska lägga den.
  .then(
    function (data) {
      let nameValue = data['name'];
      let descriptionValue = data['weather'][0]['description'];
      let temperatureValue = data['main']['temp'];
      let windSpeedValue = data['wind']['speed'];
      let humidityValue = data['main']['humidity'];
      name.innerHTML = nameValue;
      description.innerHTML = descriptionValue;
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temperature.innerHTML = temperatureValue + ' Celsius';
      windSpeed.innerHTML = windSpeedValue;
      humidity.innerHTML = humidityValue;

      // IF statement som ändrar färg på stadens namn vid de olika temperaturerna
      // se nedan för de olika brytpunkterna
      if(temperatureValue <= 0){
        name.style.color = 'turquoise';
      }
      else if(temperatureValue > 0 && temperatureValue < 20){
        name.style.color = 'blue';
      }
      else if(temperatureValue > 20 && temperatureValue < 30){
        name.style.color = 'orange';
      }
      else if(temperatureValue > 30){
        name.style.color = 'red';
      }
    }
  ).catch(
    function () {
      console.log('No city with that name was found');
    }
  )
event.preventDefault();
})


