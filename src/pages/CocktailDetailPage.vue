<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from 'src/composables/useFetch'
import { computed, watch, ref, watchEffect } from 'vue'
import GoBackBtn from 'src/components/GoBackBtn.vue'

const props = defineProps({
  id: String,
  isRandom: Boolean,
})

const route = useRoute()

const cocktailId = computed(() => route.params.id)

const filter = computed(() => (props.isRandom ? 'random.php' : `lookup.php?i=${cocktailId.value}`))

const { data, loading, fetchData } = useFetch()
fetchData(filter.value)

watch(cocktailId, () => {
  fetchData(filter.value)
})

const isFavourite = ref(false)

watchEffect(() => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || []
  isFavourite.value = favourites.some((f) => f.idDrink === cocktailId.value)
})

const toggleFavourites = () => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || []
  const drink = data.value.drinks[0]

  if (!isFavourite.value) {
    favourites.push(drink)
    localStorage.setItem('favourites', JSON.stringify(favourites))
    isFavourite.value = true
    alert('Added to favourites!')
  } else {
    const updatedFavourites = favourites.filter((favourite) => favourite.idDrink !== drink.idDrink)
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
    isFavourite.value = false
    alert('Removed from favourites!')
  }
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
    <div class="btn-container">
      <GoBackBtn />
      <q-btn
        :label="isFavourite ? 'Remove' : 'Add'"
        icon="favorite"
        color="secondary"
        @click="toggleFavourites"
        class="go-back-btn"
      />
    </div>

    <div v-if="!loading && data?.drinks">
      <q-card class="cocktail-card">
        <h3 class="cocktail-title">{{ data.drinks[0].strDrink }}</h3>

        <q-img
          :src="data.drinks[0].strDrinkThumb"
          class="cocktail-img"
          :alt="data.drinks[0].strDrink"
        />

        <section>
          <p class="cocktail-info"><strong>Category:</strong> {{ data.drinks[0].strCategory }}</p>
          <p class="cocktail-info"><strong>Type:</strong> {{ data.drinks[0].strAlcoholic }}</p>
          <p class="cocktail-info"><strong>Glass:</strong> {{ data.drinks[0].strGlass }}</p>
        </section>

        <section>
          <h4>Ingredients</h4>
          <ul class="cocktail-ingredients">
            <li v-for="(ingredient, index) in getIngredients(data.drinks[0])" :key="ingredient">
              {{ ingredient }} -
              <span class="measure">{{
                getMeasurements(data.drinks[0])[index] || 'No measure'
              }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h4>Instructions</h4>
          <p class="cocktail-instructions">{{ data.drinks[0].strInstructions }}</p>
        </section>
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
  margin-bottom: 1.5em;
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
.btn-container {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}
</style>
