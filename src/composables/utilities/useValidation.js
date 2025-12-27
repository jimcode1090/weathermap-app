import {ref, computed} from "vue";

export function useValidation() {

    const errors = ref({})


    const validateRequired = (formData, errorMessage = 'Todos los campos son obligatorios') => {
        const hasEmptyFields = Object.values(formData).some(value =>
            value === '' || value === null || value === undefined
        )
        if (hasEmptyFields) {
            errors.value.general = errorMessage
            return false
        }

        errors.value = {}
        return true
    }

    const clearErrors = () => {
        errors.value ={}
    }

    const setError = (field, message) => {
        errors.value[field] = message
    }

    const hasErrors = computed(() => Object.keys(errors).length > 0)

    return {
        errors,
        hasErrors,
        validateRequired,
        clearErrors,
        setError
    }
}