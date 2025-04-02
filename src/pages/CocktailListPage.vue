<script setup>
import { useFetch } from 'src/composables/useFetch'
const { data, loading } = useFetch('filter.php?c=Cocktail')
</script>

<template>
  <h2>Make your search</h2>
  <q-list v-if="!loading">
    <q-item
      v-for="drink in data?.drinks"
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
  <div v-else>Awaiting data</div>
</template>
