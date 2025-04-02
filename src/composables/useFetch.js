import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

export function useFetch() {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const fetchData = async (filter = '') => {
    loading.value = true
    try {
      const response = await axios.get(API_URL + filter)
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
