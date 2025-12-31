
import {API_CONFIG, buildApiUrl} from "../constants/api.js";
import {CurrentCoordinate} from "../models/CurrentCoordinate.js";
import axios from "axios";
import {CurrentWeather} from "../models/CurrentWeather.js";


class WeatherMapService {

    
    async getCoordsByCity(city, country) {
        try {
            const url = buildApiUrl(API_CONFIG.ENDPOINT.COORDINATES_BY_LOCATION_NAME, {
                ...API_CONFIG.DEFAULT_PARAMS,
                q: `${city},${country}`,
                limit: 1
            })
            const { data } = await axios(url);
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid API response format')
            }
            return CurrentCoordinate.fromApi(data[0])
        }catch (error) {
            console.error('Error fetching getCoordsByCity:', error)
            throw new Error('No se pudieron obtener las coordenadas. Por favor intenta más tarde.')
        }
    }

    async getCurrentWeatherData(lat, lng) {
        try {
            const url  = buildApiUrl(API_CONFIG.ENDPOINT.CURRENT_WEATHER_DATA, {
                lat,
                lon: lng,
                ...API_CONFIG.DEFAULT_PARAMS
            })

            const {data} = await axios(url)
            console.log(data)
            return CurrentWeather.fromApi(data)
        }catch (error) {
            console.error('Error fetching getCurrentWeatherData:', error)
            throw new Error('No se pudieron obtener el clima. Por favor intenta más tarde.')
        }
    }
    
}


export const weatherMapService = new WeatherMapService()