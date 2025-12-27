export class CoordinateCurrent {

    constructor(name, lat, lon, country, state) {
        this.name = name
        this.lat = lat
        this.lon = lon
        this.country = country
        this.state = state
    }

    static fromApi (apiData) {
        if (!apiData){
            throw new Error('Invalid Coordinate Current data')
        }

        return new CoordinateCurrent(
            apiData.name,
            apiData.lat,
            apiData.lon,
            apiData.country,
            apiData.state
        )
    }

    toJSON() {
        return {
            name: this.name,
            lat: this.lat,
            lon: this.lon,
            country: this.country,
            state: this.state

        }
    }

}