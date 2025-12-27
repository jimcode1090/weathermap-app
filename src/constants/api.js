export const API_CONFIG = {
    BASE_URL: 'http://api.openweathermap.org',
    ENDPOINT: {
        DIRECT_GEOCODING : '/geo/1.0/direct'
    },
    DEFAULT_PARAMS : {
        LIMIT: 1,
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