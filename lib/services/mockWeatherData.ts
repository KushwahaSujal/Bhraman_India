// Mock weather data for development when API rate limits are hit
export const mockWeatherData = {
  'Delhi, India': {
    location: 'Delhi',
    current: {
      temp_c: 32,
      temp_f: 90,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 55,
      wind_kph: 14,
      feelslike_c: 35,
      uv: 7
    },
    forecast: {
      forecastday: [
        {
          date: '2025-08-18',
          day: {
            maxtemp_c: 34,
            mintemp_c: 26,
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
            maxtemp_c: 36,
            mintemp_c: 28,
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
            maxtemp_c: 30,
            mintemp_c: 24,
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
  'Jaipur, Rajasthan': {
    location: 'Jaipur',
    current: {
      temp_c: 35,
      temp_f: 95,
      condition: {
        text: 'Sunny',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 40,
      wind_kph: 10,
      feelslike_c: 38,
      uv: 9
    }
  },
  'Goa, India': {
    location: 'Goa',
    current: {
      temp_c: 29,
      temp_f: 84,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 75,
      wind_kph: 16,
      feelslike_c: 32,
      uv: 6
    }
  },
  'Varanasi, Uttar Pradesh': {
    location: 'Varanasi',
    current: {
      temp_c: 30,
      temp_f: 86,
      condition: {
        text: 'Humid',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/143.png'
      },
      humidity: 72,
      wind_kph: 8,
      feelslike_c: 34,
      uv: 5
    }
  },
  'Manali, Himachal Pradesh': {
    location: 'Manali',
    current: {
      temp_c: 18,
      temp_f: 64,
      condition: {
        text: 'Clear',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 50,
      wind_kph: 6,
      feelslike_c: 16,
      uv: 6
    }
  },
  'Kerala, India': {
    location: 'Kerala',
    current: {
      temp_c: 28,
      temp_f: 82,
      condition: {
        text: 'Light rain shower',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/353.png'
      },
      humidity: 85,
      wind_kph: 12,
      feelslike_c: 31,
      uv: 4
    }
  },
  'Mumbai, Maharashtra': {
    location: 'Mumbai',
    current: {
      temp_c: 30,
      temp_f: 86,
      condition: {
        text: 'Overcast',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/122.png'
      },
      humidity: 80,
      wind_kph: 18,
      feelslike_c: 34,
      uv: 3
    }
  },
  'Shimla, Himachal Pradesh': {
    location: 'Shimla',
    current: {
      temp_c: 16,
      temp_f: 61,
      condition: {
        text: 'Clear',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 45,
      wind_kph: 9,
      feelslike_c: 14,
      uv: 5
    }
  },
  'Agra, Uttar Pradesh': {
    location: 'Agra',
    current: {
      temp_c: 31,
      temp_f: 88,
      condition: {
        text: 'Sunny',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 50,
      wind_kph: 11,
      feelslike_c: 34,
      uv: 8
    }
  },
  'Udaipur, Rajasthan': {
    location: 'Udaipur',
    current: {
      temp_c: 30,
      temp_f: 86,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 58,
      wind_kph: 10,
      feelslike_c: 33,
      uv: 7
    }
  },
  'Rishikesh, Uttarakhand': {
    location: 'Rishikesh',
    current: {
      temp_c: 27,
      temp_f: 81,
      condition: {
        text: 'Clear',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 62,
      wind_kph: 9,
      feelslike_c: 29,
      uv: 6
    }
  },
  'Amritsar, Punjab': {
    location: 'Amritsar',
    current: {
      temp_c: 29,
      temp_f: 84,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 57,
      wind_kph: 12,
      feelslike_c: 32,
      uv: 7
    }
  },
  'Mysore, Karnataka': {
    location: 'Mysore',
    current: {
      temp_c: 26,
      temp_f: 79,
      condition: {
        text: 'Partly cloudy',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
      },
      humidity: 70,
      wind_kph: 8,
      feelslike_c: 29,
      uv: 5
    }
  },
  'Hampi, Karnataka': {
    location: 'Hampi',
    current: {
      temp_c: 33,
      temp_f: 91,
      condition: {
        text: 'Sunny',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 45,
      wind_kph: 13,
      feelslike_c: 36,
      uv: 8
    }
  },
  'Leh, Ladakh': {
    location: 'Leh',
    current: {
      temp_c: 12,
      temp_f: 54,
      condition: {
        text: 'Clear',
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
      },
      humidity: 32,
      wind_kph: 15,
      feelslike_c: 9,
      uv: 9
    }
  }
}

// Get mock weather recommendation
export function getMockWeatherRecommendation(temp_c: number, condition: string) {
  if (temp_c >= 15 && temp_c <= 28 && !condition.toLowerCase().includes('rain')) {
    return {
      suitability: 'excellent' as const,
      message: 'Perfect weather for sightseeing!',
      hindiMessage: 'दर्शनीय स्थलों की यात्रा के लिए उत्तम मौसम!',
      activities: ['Heritage site visits', 'Photography', 'Walking tours', 'Outdoor dining']
    }
  } else if (temp_c >= 10 && temp_c <= 35) {
    return {
      suitability: 'good' as const,
      message: 'Good weather for most activities',
      hindiMessage: 'अधिकांश गतिविधियों के लिए अच्छा मौसम',
      activities: ['Museum visits', 'Indoor attractions', 'Shopping', 'Cultural events']
    }
  } else if (temp_c >= 5 && temp_c <= 40) {
    return {
      suitability: 'fair' as const,
      message: 'Okay for indoor activities',
      hindiMessage: 'इनडोर गतिविधियों के लिए उपयुक्त',
      activities: ['Museums', 'Art galleries', 'Cultural centers', 'Restaurants']
    }
  } else {
    return {
      suitability: 'poor' as const,
      message: 'Consider postponing outdoor activities',
      hindiMessage: 'बाहरी गतिविधियों को स्थगित करने पर विचार करें',
      activities: ['Indoor shopping', 'Cultural shows', 'Hotel amenities']
    }
  }
}
