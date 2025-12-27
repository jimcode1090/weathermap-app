import {ref} from "vue";
import {SUPPORTED_COUNTRIES} from "../constants/countries.js";
import {weatherMapService} from "../services/weatherMapService.js";
import {useAsync} from "../composables/utilities/useAsync.js";
import {useValidation} from "../composables/utilities/useValidation.js";


export function useWeatherMapViewModel() {

    const currentWeatherMap = ref(null)
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

        try {
            currentWeatherMap.value = await execute(() =>
                weatherMapService.getCoordsByCity(
                    formData.value.city,
                    formData.value.country
                )
            )

            console.log({currentWeatherMap})
        }catch (e) {
            setError('general', e.message)
        }

    }

    return {
        //Estado
        countries,

        formData,
        loading,
        errors,

        //Acciones
        fetchWeather
    }
}