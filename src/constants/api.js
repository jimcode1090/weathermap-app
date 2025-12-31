export const API_CONFIG = {
    BASE_URL: 'http://api.openweathermap.org',
    ENDPOINT: {
        COORDINATES_BY_LOCATION_NAME : '/geo/1.0/direct',
        CURRENT_WEATHER_DATA: '/data/2.5/weather'
    },
    DEFAULT_PARAMS : {
        APPID: import.meta.env.VITE_API_WEATHERMAP
    }
}

export const buildApiUrl = (endpoint, params ={}) => {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`)
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })
    return url.toString()
}