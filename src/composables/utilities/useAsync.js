import { ref } from "vue";

export function useAsync () {
    const loading = ref(false)
    const error = ref(null)

    const execute = async (asyncFn) => {
        loading.value = true
        error.value = null

        try {
            return await asyncFn()
        }catch (e) {
            error.value = e.message || 'Ocurrió un error desconocido'
        }finally {
            loading.value = false
        }

    }

    const reset = () => {
        loading.value = false
        error.value = null
    }

    return {
        loading,
        error,
        execute,
        reset
    }
}