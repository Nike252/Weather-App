import { useEffect, useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("london");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get API key from environment variables (.env file in Frontend directory)
  // Example .env line: VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod && data.cod !== 200) {
        setError(data.message || "Failed to fetch weather data.");
        setWeatherData(null);
        setForecast([]);
        setLoading(false);
        return;
      }
      setWeatherData(data);

      const foreCastresponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`
      );
      const forecastdata = await foreCastresponse.json();
      if (forecastdata.cod && forecastdata.cod !== "200") {
        setError(forecastdata.message || "Failed to fetch forecast data.");
        setForecast([]);
        setLoading(false);
        return;
      }

      setCity(cityName);

      // Only filter if forecastdata.list exists and is an array
      const dailyForecast = Array.isArray(forecastdata.list)
        ? forecastdata.list.filter((item, index) => index % 8 === 0)
        : [];
      setForecast(dailyForecast);
    } catch (error) {
      setError("Sorry, we couldn't retrieve the weather data at this time");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
    // eslint-disable-next-line
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center px-2">
      <div className="w-full max-w-xl bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 rounded-lg border border-white/30 bg-white/30 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mr-4"></div>
            <span className="text-blue-900 font-medium">Loading...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 mb-4 text-center">
            {error}
          </div>
        )}

        {weatherData && weatherData.main && weatherData.weather && !error && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white drop-shadow">{weatherData.name}</h1>
              <p className="text-5xl font-extrabold text-white my-2">{Math.round(weatherData.main.temp)}°F</p>
              <p className="text-lg text-white/80 capitalize">{weatherData.weather[0].main}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="mx-auto"
              />
            </div>
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white/30 rounded-lg p-4 text-center w-32">
                <p className="text-gray-700">Humidity</p>
                <p className="font-bold text-lg text-blue-900">{Math.round(weatherData.main.humidity)}%</p>
              </div>
              <div className="bg-white/30 rounded-lg p-4 text-center w-32">
                <p className="text-gray-700">Wind Speed</p>
                <p className="font-bold text-lg text-blue-900">{Math.round(weatherData.wind.speed)} mph</p>
              </div>
            </div>
          </>
        )}

        {forecast.length > 0 && !error && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">5-Day Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="bg-white/30 rounded-lg p-3 flex flex-col items-center">
                  <p className="font-medium text-gray-700">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    className="w-12 h-12"
                  />
                  <p className="font-bold text-blue-900">{Math.round(day.main.temp)}°F</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;