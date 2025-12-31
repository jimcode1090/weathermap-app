import {computed, ref} from "vue";
import {SUPPORTED_COUNTRIES} from "../constants/countries.js";
import {weatherMapService} from "../services/weatherMapService.js";
import {useAsync} from "../composables/utilities/useAsync.js";
import {useValidation} from "../composables/utilities/useValidation.js";


export function useWeatherMapViewModel() {

    const currentWeather = ref({})
    const formData = ref({
        city: '',
        country: ''
    })

    const countries = SUPPORTED_COUNTRIES;

    const {loading, execute} = useAsync()
    const {errors, validateRequired, clearErrors, setError} = useValidation()

    const fetchWeather = async () => {
        if (!validateRequired(formData.value)){
            return
        }

        clearErrors()
        currentWeather.value = {}

        try {
            // Obtenemos la lat, lng
            const {lat, lon} = await execute(() =>
                weatherMapService.getCoordsByCity(
                    formData.value.city,
                    formData.value.country
                )
            )
            // Obtenemos el clima basándonos en lat y lng
            const response = await execute(() =>
                weatherMapService.getCurrentWeatherData(lat, lon)
            )

            currentWeather.value = response

        }catch (err) {
            console.log({err})
            console.log(err.message)
            setError('general', err.message)
        }

    }

    const showWeather = computed(() => {
        return Object.values(currentWeather.value).length > 0
    })

    return {
        //Estado
        countries,
        currentWeather,

        formData,
        loading,
        errors,

        showWeather,

        //Acciones
        fetchWeather,
    }
}