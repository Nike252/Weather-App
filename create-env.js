const fs = require('fs');
const path = require('path');

const envContent = `# OpenWeatherMap API Key
# Get your free API key from: https://openweathermap.org/api
# Replace YOUR_API_KEY_HERE with your actual API key
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit the .env file and replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key');
  console.log('🔗 Get your free API key from: https://openweathermap.org/api');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
} 