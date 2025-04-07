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
  <div class="favourite-card">
    <q-card clickable @click="goToCocktail" class="card">
      <q-img :src="props.cocktail.strDrinkThumb" class="card-img" />
      <q-card-section class="card-section">
        <h2 class="card-title">{{ props.cocktail.strDrink }}</h2>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.favourite-card {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

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
  object-fit: cover;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.favourite-card .q-card {
  background-color: #fff;
}
</style>
