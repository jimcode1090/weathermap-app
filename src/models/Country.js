

export class Country {

    constructor(code, name) {
        this.code = code
        this.name = name
    }

    static fromJSON(json) {
        return new Country(json.code, json.name)
    }

    toJson (){
        return {
            code: this.code,
            name: this.name
        }
    }
}