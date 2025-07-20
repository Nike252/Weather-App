import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get API key from environment variables
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    if (!API_KEY || API_KEY === '366ed6cedc32cffe1fea54769589aec1') {
      setError('API key not configured. Please check the setup guide.')
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.')
        } else {
          throw new Error('Failed to fetch weather data. Please try again.')
        }
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather()
    }
  }

  const getWeatherBackground = () => {
    if (!weather) return 'bg-gradient-to-br from-blue-400 to-blue-600'
    
    const weatherMain = weather.weather[0].main.toLowerCase()
    const temp = weather.main.temp

    if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      return 'bg-gradient-to-br from-gray-500 to-gray-700'
    } else if (weatherMain.includes('snow')) {
      return 'bg-gradient-to-br from-blue-200 to-blue-400'
    } else if (weatherMain.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-400 to-gray-600'
    } else if (weatherMain.includes('clear')) {
      return temp > 20 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-blue-400 to-blue-600'
    } else if (weatherMain.includes('thunder')) {
      return 'bg-gradient-to-br from-purple-600 to-gray-800'
    } else {
      return 'bg-gradient-to-br from-blue-400 to-blue-600'
    }
  }

  return (
    <div className={`min-h-screen ${getWeatherBackground()} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Weather Forecast</h1>
            <p className="text-white/80">Get current weather information</p>
          </div>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="flex-1 px-4 py-2 rounded-lg border border-white/20 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button
                onClick={fetchWeather}
                disabled={loading}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading weather data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-6 text-center border border-red-500/30">
              <p className="text-red-200 font-medium">{error}</p>
            </div>
          )}

          {/* Weather Display */}
          {weather && !loading && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-white mb-2">{weather.name}, {weather.sys.country}</h2>
                <p className="text-white/80">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>

              <div className="flex items-center justify-center mb-6">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-24 h-24"
                />
                <div className="text-left ml-4">
                  <p className="text-6xl font-bold text-white">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-white/80 capitalize">{weather.weather[0].description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60">Feels like</p>
                  <p className="text-white font-semibold">{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60">Humidity</p>
                  <p className="text-white font-semibold">{weather.main.humidity}%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60">Wind</p>
                  <p className="text-white font-semibold">{Math.round(weather.wind.speed)} m/s</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60">Pressure</p>
                  <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
