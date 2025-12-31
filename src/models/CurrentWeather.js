export class CurrentWeather {
    constructor(name, temp, feels_like, temp_min, temp_max, pressure, humidity, sea_level, grnd_level) {
        this.name = name
        this.temp = temp
        this.feels_like = feels_like
        this.temp_min = temp_min
        this.temp_max = temp_max
        this.pressure = pressure
        this.humidity = humidity
        this.sea_level = sea_level
        this.grnd_level = grnd_level
    }

    static fromApi(apiData) {
        console.log({apiData})
        if (!apiData){
            throw new Error('Invalid Current Weather data')
        }

        return new CurrentWeather(
            apiData.name,
            apiData.main.temp,
            apiData.main.feels_like,
            apiData.main.temp_min,
            apiData.main.temp_max,
            apiData.main.pressure,
            apiData.main.humidity,
            apiData.main.sea_level,
            apiData.main.grnd_level
        )
    }

    toJSON() {
        return {
            name: this.name,
            temp: this.temp,
            feels_like: this.feels_like,
            temp_min: this.temp_min,
            temp_max: this.temp_max,
            pressure: this.pressure,
            humidity: this.humidity,
            sea_level: this.sea_level,
            grnd_level: this.grnd_level
        }
    }
}
