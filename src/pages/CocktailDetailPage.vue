<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from 'src/composables/useFetch'
import { computed } from 'vue'

const props = defineProps({
  isRandom: Boolean,
})

const route = useRoute()
const router = useRouter()

const cocktailId = computed(() => route.params.id)

const filter = props.isRandom ? 'random.php' : `lookup.php?i=${cocktailId.value}`
const { data, loading } = useFetch(filter)

const goBack = () => {
  router.back()
}
</script>

<template>
  <q-page>
    <q-btn label="Go Back" icon="arrow_back" color="primary" @click="goBack" class="q-mb-md" />

    <h2 v-if="!props.isRandom">Your cocktail</h2>
    <h2 v-else>Your random cocktail</h2>

    <q-list v-if="!loading && data?.drinks">
      <q-item v-for="drink in data.drinks" :key="drink.idDrink">
        <q-item-section avatar>
          <q-img :src="drink.strDrinkThumb" width="50px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ drink.strDrink }}</q-item-label>
          <q-item-label caption>Category: {{ drink.strCategory }}</q-item-label>
          <q-item-label caption>Type: {{ drink.strAlcoholic }}</q-item-label>
          <q-item-label caption>Glass: {{ drink.strGlass }}</q-item-label>
          <q-item-label caption>Instructions: {{ drink.strInstructions }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else>Your cocktail is loading...</div>
  </q-page>
</template>
