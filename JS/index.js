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
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6eb9a8c868f9d47961df8d6b3e67e776`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, feels_like } = data.main;
          const [{ description }] = data.weather;

          // Set Dom Elements from API
          temperatureDegree.textContent = temp;

          temperatureDetails.textContent = `Oh God it feels like ${feels_like}`;
          cloud.textContent = description;

          locationTimezone.textContent = data.name;
          //FORMULA FOR CELSIUS
          let fahrenheit = temp * 1.8 + 32;
          let feelsLikeFahrenheit = feels_like * 1.8 + 32;

          temperatureMain.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
              temperatureDetails.textContent = `Oh God it feels like ${Math.floor(
                feelsLikeFahrenheit
              )}`;
              temperatureMain.style.transform = "translateX(-10%)";
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(temp);
              temperatureDetails.textContent = `Oh God it feels like ${Math.floor(
                feels_like
              )}`;
              temperatureMain.style.transform = "translateX(10%)";
            }
          });
        });
    });
  }
});
