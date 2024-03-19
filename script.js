document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("city-form");
    const cityInput = document.getElementById("city-input");
    const weatherOutput = document.getElementById("weather-output");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const cityName = cityInput.value;
        const apiKey = " ";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                weatherOutput.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;

                let ctxTemp = document.getElementById('tempChart').getContext('2d');
                let ctxHumidity = document.getElementById('humidityChart').getContext('2d');
                let ctxWind = document.getElementById('windChart').getContext('2d');


                let tempChart = new Chart(ctxTemp, {
                    type: 'bar',
                    data: {
                        labels: ['Temperature'],
                        datasets: [{
                            label: 'Temperature',
                            data: [data.main.temp],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                let humidityChart = new Chart(ctxHumidity, {
                    type: 'bar',
                    data: {
                        labels: ['Humidity'],
                        datasets: [{
                            label: 'Humidity',
                            data: [data.main.humidity],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                let windChart = new Chart(ctxWind, {
                    type: 'bar',
                    data: {
                        labels: ['Wind Speed'],
                        datasets: [{
                            label: 'Wind Speed',
                            data: [data.wind.speed],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                weatherOutput.innerHTML = "<p>Error fetching weather data. Please try again.</p>";
            });
    });
});