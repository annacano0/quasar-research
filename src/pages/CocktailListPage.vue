<script setup>
import { useFetch } from 'src/composables/useFetch'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'

const router = useRouter()
const search = ref('')
const selectedFilter = ref({ label: 'Name', value: 'name' })

const filter = computed(() => {
  if (!search.value.trim()) return 'filter.php?c=Cocktail'
  return selectedFilter.value.value === 'ingredient'
    ? `filter.php?i=${search.value}`
    : `search.php?s=${search.value}`
})

const { data, loading, fetchData } = useFetch()
fetchData(filter.value)

watch([filter, selectedFilter], () => {
  fetchData(filter.value)
})

const goBack = () => {
  router.back()
}
// no seria realment necessaria ja que el v-bind y el watch fan el mateix, pero es per complir amb els requisits de la tasca
const goToCocktail = () => {
  fetchData(filter.value)
}
</script>
<template>
  <div class="search-container">
    <h2 class="title">Make your search</h2>
    <q-btn
      label="Go Back"
      icon="arrow_back"
      color="white"
      text-color="black"
      @click="goBack"
      class="back-btn"
    />

    <section class="search-section">
      <q-select
        v-model="selectedFilter"
        :options="[
          { label: 'Name', value: 'name' },
          { label: 'Ingredient', value: 'ingredient' },
        ]"
        label="Search by"
        class="custom-select"
      />

      <q-input
        filled
        v-model="search"
        label="Search for a cocktail"
        class="custom-input"
        debounce="300"
      >
        <template v-slot:append>
          <q-btn flat icon="search" @click="goToCocktail" class="search-btn" />
        </template>
      </q-input>
    </section>

    <q-list v-if="!loading && data?.drinks" class="results-list">
      <q-item
        v-for="drink in data.drinks"
        :key="drink.idDrink"
        clickable
        v-ripple
        :to="`/cocktails/${drink.idDrink}`"
        class="cocktail-item"
      >
        <q-item-section avatar>
          <q-img :src="drink.strDrinkThumb" width="50px" class="drink-image" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="drink-name">{{ drink.strDrink }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else class="loading-text">Awaiting data...</div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

.back-btn {
  margin-bottom: 20px;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

.custom-select,
.custom-input {
  width: 100%;
}

.search-btn {
  background: white;
  color: black;
  transition: background 0.3s ease-in-out;
}

.search-btn:hover {
  background: black;
  color: white;
}

.results-list {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
}

.cocktail-item {
  transition: transform 0.2s ease-in-out;
}

.cocktail-item:hover {
  transform: scale(1.05);
}

.drink-image {
  border-radius: 10px;
}

.drink-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.loading-text {
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
