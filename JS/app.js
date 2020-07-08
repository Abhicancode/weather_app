window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureMain = document.querySelector(".temperature");
  let temperatureDetails = document.querySelector(".temperature-details");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let cloud = document.querySelector(".Cloud");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.weatherstack.com/current?access_key=76c3099011c70ac0a0676083ba854b0e&query= ${lat}, ${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, feelslike, weather_descriptions } = data.current;
          const { name } = data.location;

          //Set Dom Elements from API
          temperatureDegree.textContent = temperature;

          temperatureDetails.textContent = `Oh God it feels like ${feelslike}`;
          cloud.textContent = weather_descriptions;

          locationTimezone.textContent = name;
          //FORMULA FOR CELSIUS
          let fahrenheit = temperature * 1.8 + 32;
          let feelsLikeFahrenheit = feelslike * 1.8 + 32;

          temperatureMain.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
              temperatureDetails.textContent = `Oh God it feels like ${Math.floor(
                feelsLikeFahrenheit
              )}`;
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temperature;
              temperatureDetails.textContent = `Oh God it feels like ${feelslike}`;
            }
          });
        });
    });
  }
});
