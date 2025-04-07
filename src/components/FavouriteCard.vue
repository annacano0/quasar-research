<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
})

const goToCocktail = () => {
  router.push(`/cocktails/${props.cocktail.idDrink}`)
}
</script>

<template>
  <q-card clickable @click="goToCocktail" class="card">
    <q-img
      :src="props.cocktail.strDrinkThumb"
      class="card-img"
      loading="lazy"
      :alt="props.cocktail.strDrink"
    />
    <section class="card-section">
      <h2 class="card-title">{{ props.cocktail.strDrink }}</h2>
    </section>
  </q-card>
</template>

<style scoped>
.card {
  width: 250px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img {
  height: 150px;
}

.card-section {
  padding: 10px;
  text-align: center;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
  overflow: hidden;
}

.favourite-card .q-card {
  background-color: #fff;
}
</style>
