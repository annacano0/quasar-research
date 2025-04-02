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
  <div class="cocktail-container">
    <h2 v-if="!props.isRandom">Your Cocktail</h2>
    <h2 v-else>Your Random Cocktail</h2>

    <q-btn
      label="Go Back"
      icon="arrow_back"
      color="primary"
      @click="goBack"
      class="q-mb-md go-back-btn"
    />

    <div v-if="!loading && data?.drinks">
      <q-card v-for="drink in data.drinks" :key="drink.idDrink" class="cocktail-card">
        <h3 class="cocktail-title">{{ drink.strDrink }}</h3>

        <q-img :src="drink.strDrinkThumb" class="cocktail-img" />

        <q-card-section>
          <p class="cocktail-info"><strong>Category:</strong> {{ drink.strCategory }}</p>
          <p class="cocktail-info"><strong>Type:</strong> {{ drink.strAlcoholic }}</p>
          <p class="cocktail-info"><strong>Glass:</strong> {{ drink.strGlass }}</p>
        </q-card-section>

        <q-card-section>
          <h4>Ingredients</h4>
          <ul class="cocktail-ingredients">
            <li v-for="(ingredient, index) in getIngredients(drink)" :key="ingredient">
              {{ ingredient }} -
              <span class="measure">{{ getMeasurements(drink)[index] || 'No measure' }}</span>
            </li>
          </ul>
        </q-card-section>

        <q-card-section>
          <h4>Instructions</h4>
          <p class="cocktail-instructions">{{ drink.strInstructions }}</p>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="loading-text">Your cocktail is loading...</div>
  </div>
</template>

<style scoped>
.cocktail-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.go-back-btn {
  margin-bottom: 20px;
}

.cocktail-card {
  background-color: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 15px;
}

.cocktail-img {
  width: 100%;
  border-radius: 12px;
}

.cocktail-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.cocktail-info {
  font-size: 14px;
  color: #666;
}

.cocktail-ingredients {
  list-style: none;
  padding: 0;
}

.cocktail-ingredients li {
  background: #eaeaea;
  padding: 8px;
  margin: 5px 0;
  border-radius: 8px;
}

.measure {
  font-weight: bold;
  color: #555;
}

.cocktail-instructions {
  text-align: left;
  background: #fff3cd;
  padding: 10px;
  border-radius: 8px;
}

.loading-text {
  font-size: 18px;
  color: #888;
}
</style>
