import {API_CONFIG, buildApiUrl} from "../constants/api.js";
import {CoordinateCurrent} from "../models/CoordinateCurrent.js";


class WeatherMapService {
    
    
    async getCoordsByCity(city, country) {
        try {
            const url = buildApiUrl(API_CONFIG.ENDPOINT.DIRECT_GEOCODING, {
                ...API_CONFIG.DEFAULT_PARAMS,
                q: `${city},${country}`
            })

            console.log(url)

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid API response format')
            }
            return CoordinateCurrent.fromApi(data[0])
        }catch (e) {
            console.error('Error fetching cryptocurrencies:', error)
            throw new Error('No se pudieron obtener el clima. Por favor intenta más tarde.')
        }
    }
    
}


export const weatherMapService = new WeatherMapService()