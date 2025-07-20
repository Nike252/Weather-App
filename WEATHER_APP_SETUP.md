# Weather App Setup Guide

## Getting Your OpenWeatherMap API Key

1. **Sign up for a free account** at [OpenWeatherMap](https://openweathermap.org/api)
2. **Navigate to your API keys** section in your account dashboard
3. **Copy your API key** (it will look something like: `1234567890abcdef1234567890abcdef`)

## Setting Up the Environment Variables

1. **Create a `.env` file** in the Frontend directory with the following content:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

2. **Replace `your_actual_api_key_here`** with your actual OpenWeatherMap API key

## Important Notes

- **Never commit your API key** to version control
- The `.env` file should be added to `.gitignore` (it already is in this project)
- Environment variables in Vite must start with `VITE_` to be accessible in the browser
- The API key is free for up to 1000 calls per day

## Running the App

1. Make sure you have the `.env` file with your API key
2. Run `npm install` if you haven't already
3. Run `npm run dev` to start the development server
4. Open your browser to the URL shown in the terminal

## Features

- ✅ City search with real-time weather data
- ✅ Temperature in Celsius
- ✅ Weather description and icons
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Dynamic background colors based on weather conditions
- ✅ Additional weather details (humidity, wind, pressure, feels like) 