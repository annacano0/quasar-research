<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from 'src/composables/useFetch'
import { computed, watch } from 'vue'

const props = defineProps({
  id: String,
  isRandom: Boolean,
})

const route = useRoute()
const router = useRouter()

const cocktailId = computed(() => route.params.id)

const filter = computed(() => (props.isRandom ? 'random.php' : `lookup.php?i=${cocktailId.value}`))

const { data, loading, fetchData } = useFetch()
fetchData(filter.value)

watch(cocktailId, () => {
  fetchData(filter.value)
})

const goBack = () => {
  router.back()
}

function getIngredients(drink) {
  const ingredients = []
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`]
    if (ingredient) {
      ingredients.push(ingredient)
    }
  }
  return ingredients
}

function getMeasurements(drink) {
  const measurements = []
  for (let i = 1; i <= 15; i++) {
    const measurement = drink[`strMeasure${i}`]
    if (measurement) {
      measurements.push(measurement)
    }
  }
  return measurements
}
</script>

<template>
  <h2 v-if="!props.isRandom">Your cocktail</h2>
  <h2 v-else>Your random cocktail</h2>
  <q-btn label="Go Back" icon="arrow_back" color="primary" @click="goBack" class="q-mb-md" />

  <div v-if="!loading && data?.drinks">
    <q-list>
      <q-item v-for="drink in data.drinks" :key="drink.idDrink">
        <q-item-section avatar>
          <q-img :src="drink.strDrinkThumb" width="50px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ drink.strDrink }}</q-item-label>
          <q-item-label caption>Category: {{ drink.strCategory }}</q-item-label>
          <q-item-label caption>Type: {{ drink.strAlcoholic }}</q-item-label>
          <q-item-label caption>Glass: {{ drink.strGlass }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>Ingredients:</q-item-label>
          <ul>
            <li v-for="(ingredient, index) in getIngredients(drink)" :key="ingredient">
              {{ ingredient }} - {{ getMeasurements(drink)[index] || 'No measure' }}
            </li>
          </ul>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Instructions:</q-item-label>
          <p>{{ drink.strInstructions }}</p>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div v-else>Your cocktail is loading...</div>
</template>
