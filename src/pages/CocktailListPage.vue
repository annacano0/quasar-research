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
  <h2>Make your search</h2>
  <q-btn label="Go Back" icon="arrow_back" color="primary" @click="goBack" class="q-mb-md" />

  <section>
    <q-select
      v-model="selectedFilter"
      :options="[
        { label: 'Name', value: 'name' },
        { label: 'Ingredient', value: 'ingredient' },
      ]"
      label="Search by"
      class="q-mb-md"
    />

    <q-input filled v-model="search" label="Search for a cocktail" class="q-mb-md" debounce="300">
      <template v-slot:append>
        <q-btn flat icon="search" @click="goToCocktail" />
      </template>
    </q-input>
  </section>

  <q-list v-if="!loading && data?.drinks">
    <q-item
      v-for="drink in data.drinks"
      :key="drink.idDrink"
      clickable
      v-ripple
      :to="`/cocktails/${drink.idDrink}`"
    >
      <q-item-section avatar>
        <q-img :src="drink.strDrinkThumb" width="50px" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ drink.strDrink }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <div v-else>Awaiting data...</div>
</template>
