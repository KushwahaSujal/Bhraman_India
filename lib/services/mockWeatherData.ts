// Mock weather data for development when API rate limits are hit
export const mockWeatherData = {
  'Kolkata, West Bengal': {
    location: 'Kolkata',
    current: {
      temp_c: 24,
      temp_f: 75,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 68,
      wind_kph: 12,
      feelslike_c: 26,
      uv: 5
    },
    forecast: {
      forecastday: [
        {
          date: '2025-08-18',
          day: {
            maxtemp_c: 28,
            mintemp_c: 22,
            condition: {
              text: 'Partly cloudy',
              icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
            },
            chance_of_rain: 20
          }
        },
        {
          date: '2025-08-19',
          day: {
            maxtemp_c: 30,
            mintemp_c: 24,
            condition: {
              text: 'Sunny',
              icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
            },
            chance_of_rain: 10
          }
        },
        {
          date: '2025-08-20',
          day: {
            maxtemp_c: 27,
            mintemp_c: 21,
            condition: {
              text: 'Light rain',
              icon: 'https://cdn.weatherapi.com/weather/64x64/day/296.png'
            },
            chance_of_rain: 70
          }
        }
      ]
    }
  },
  'Darjeeling, West Bengal': {
    location: 'Darjeeling',
    current: {
      temp_c: 18,
      temp_f: 64,
      condition: {
        text: 'Clear',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 55,
      wind_kph: 8,
      feelslike_c: 16,
      uv: 6
    }
  },
  'Kalimpong, West Bengal': {
    location: 'Kalimpong',
    current: {
      temp_c: 20,
      temp_f: 68,
      condition: {
        text: 'Sunny',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 48,
      wind_kph: 6,
      feelslike_c: 19,
      uv: 7
    }
  },
  'Siliguri, West Bengal': {
    location: 'Siliguri',
    current: {
      temp_c: 26,
      temp_f: 79,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 72,
      wind_kph: 10,
      feelslike_c: 28,
      uv: 4
    }
  },
  'Digha, West Bengal': {
    location: 'Digha',
    current: {
      temp_c: 25,
      temp_f: 77,
      condition: {
        text: 'Overcast',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/122.png'
      },
      humidity: 78,
      wind_kph: 15,
      feelslike_c: 27,
      uv: 3
    }
  },
  'Mandarmani, West Bengal': {
    location: 'Mandarmani',
    current: {
      temp_c: 24,
      temp_f: 75,
      condition: {
        text: 'Light rain shower',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/353.png'
      },
      humidity: 82,
      wind_kph: 18,
      feelslike_c: 26,
      uv: 2
    }
  },
  'Sundarbans, West Bengal': {
    location: 'Sundarbans',
    current: {
      temp_c: 27,
      temp_f: 81,
      condition: {
        text: 'Humid',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/143.png'
      },
      humidity: 85,
      wind_kph: 12,
      feelslike_c: 32,
      uv: 4
    }
  },
  'Durgapur, West Bengal': {
    location: 'Durgapur',
    current: {
      temp_c: 28,
      temp_f: 82,
      condition: {
        text: 'Sunny',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 60,
      wind_kph: 9,
      feelslike_c: 30,
      uv: 6
    }
  }
}

// Get mock weather recommendation
export function getMockWeatherRecommendation(temp_c: number, condition: string) {
  if (temp_c >= 15 && temp_c <= 28 && !condition.toLowerCase().includes('rain')) {
    return {
      suitability: 'excellent' as const,
      message: 'Perfect weather for sightseeing!',
      bengaliMessage: 'দর্শনীয় স্থান ভ্রমণের জন্য নিখুঁত আবহাওয়া!',
      activities: ['Heritage site visits', 'Photography', 'Walking tours', 'Outdoor dining']
    }
  } else if (temp_c >= 10 && temp_c <= 35) {
    return {
      suitability: 'good' as const,
      message: 'Good weather for most activities',
      bengaliMessage: 'অধিকাংশ কার্যকলাপের জন্য ভাল আবহাওয়া',
      activities: ['Museum visits', 'Indoor attractions', 'Shopping', 'Cultural events']
    }
  } else if (temp_c >= 5 && temp_c <= 40) {
    return {
      suitability: 'fair' as const,
      message: 'Okay for indoor activities',
      bengaliMessage: 'অভ্যন্তরীণ কার্যকলাপের জন্য উপযুক্ত',
      activities: ['Museums', 'Art galleries', 'Cultural centers', 'Restaurants']
    }
  } else {
    return {
      suitability: 'poor' as const,
      message: 'Consider postponing outdoor activities',
      bengaliMessage: 'বহিরঙ্গন কার্যক্রম স্থগিত করার কথা বিবেচনা করুন',
      activities: ['Indoor shopping', 'Cultural shows', 'Hotel amenities']
    }
  }
}
