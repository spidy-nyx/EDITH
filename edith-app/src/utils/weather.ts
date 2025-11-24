// Weather Integration
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export async function getWeather(location?: string): Promise<WeatherData | null> {
  try {
    // Get user location if not provided
    let lat: number, lon: number;
    
    if (!location) {
      // Use browser geolocation
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    } else {
      // Geocode location name (simplified)
      // In production, use a geocoding API
      throw new Error('Location search not implemented yet');
    }
    
    // Using Open-Meteo API (free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
    );
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    const current = data.current_weather;
    
    // Get location name from reverse geocoding
    const locationResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const locationData = await locationResponse.json();
    
    return {
      location: locationData.address?.city || locationData.address?.town || 'Your Location',
      temperature: Math.round(current.temperature),
      condition: getWeatherCondition(current.weathercode),
      humidity: 0, // Not provided by free API
      windSpeed: Math.round(current.windspeed),
      icon: getWeatherIcon(current.weathercode)
    };
  } catch (error) {
    console.error('Weather error:', error);
    return null;
  }
}

function getWeatherCondition(code: number): string {
  const conditions: { [key: number]: string } = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Drizzle',
    55: 'Heavy Drizzle',
    61: 'Light Rain',
    63: 'Rain',
    65: 'Heavy Rain',
    71: 'Light Snow',
    73: 'Snow',
    75: 'Heavy Snow',
    95: 'Thunderstorm'
  };
  return conditions[code] || 'Unknown';
}

function getWeatherIcon(code: number): string {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 75) return '❄️';
  if (code === 95) return '⛈️';
  return '🌤️';
}

export function formatWeatherResponse(weather: WeatherData): string {
  return `${weather.icon} Weather in ${weather.location}: ${weather.temperature}°F and ${weather.condition}. Wind speed: ${weather.windSpeed} mph.`;
}
