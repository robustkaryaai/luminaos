import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Delhi';
    
    const apiKey = process.env.WEATHERAPI_KEY;
    // Primary: WeatherAPI (requires key)
    if (apiKey) {
      try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.error) {
          const weatherData = {
            temp: Math.round(data.current.temp_c),
            feels_like: Math.round(data.current.feelslike_c),
            humidity: data.current.humidity,
            max_temp: Math.round(data.current.temp_c),
            min_temp: Math.round(data.current.temp_c),
            cloud_pct: data.current.cloud,
            wind_speed: Math.round(data.current.wind_kph * 0.277778),
            wind_degrees: data.current.wind_degree || 0
          };
          return NextResponse.json(weatherData);
        }
      } catch (e) {
        // Fall through to fallback
      }
    }

    // Fallback: Open-Meteo geocoding + current weather (no API key)
    const geoResp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoJson = await geoResp.json();
    if (!geoJson.results || geoJson.results.length === 0) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }
    const { latitude, longitude } = geoJson.results[0];
    const meteoResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const meteoJson = await meteoResp.json();
    if (!meteoJson.current_weather) {
      return NextResponse.json(
        { error: 'Weather data unavailable' },
        { status: 500 }
      );
    }
    const cw = meteoJson.current_weather;
    const fallbackWeatherData = {
      temp: Math.round(cw.temperature),
      feels_like: Math.round(cw.temperature),
      humidity: cw.relativehumidity ?? 0,
      max_temp: Math.round(cw.temperature),
      min_temp: Math.round(cw.temperature),
      cloud_pct: 0,
      wind_speed: Math.round(cw.windspeed / 3.6 * 0.277778) || Math.round(cw.windspeed * 0.277778),
      wind_degrees: cw.winddirection || 0
    };
    return NextResponse.json(fallbackWeatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 
