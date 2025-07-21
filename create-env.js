import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ⬇️ Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env content
const envContent = `# OpenWeatherMap API Key
# Get your free API key from: https://openweathermap.org/api
# Replace YOUR_API_KEY_HERE with your actual API key
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
`;

// Write to .env file
const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit the .env file and replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key');
  console.log('🔗 Get your free API key from: https://openweathermap.org/api');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
