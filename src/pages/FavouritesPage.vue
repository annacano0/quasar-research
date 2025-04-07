<script setup>
import { useRouter } from 'vue-router'
import FavouriteCard from 'src/components/FavouriteCard.vue'

const router = useRouter()
const goBack = () => {
  router.back()
}

const favourites = JSON.parse(localStorage.getItem('favourites')) || []
</script>

<template>
  <div class="home-container">
    <h1 class="title">Your favourites</h1>
    <q-btn
      label="Go Back"
      icon="arrow_back"
      color="white"
      text-color="black"
      @click="goBack"
      class="back-btn"
    />

    <div class="favs-container">
      <div v-if="favourites.length > 0">
        <FavouriteCard
          v-for="cocktail in favourites"
          :key="cocktail.idDrink"
          :cocktail="cocktail"
        />
      </div>
      <p v-else>There are no favourites yet 😔</p>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  height: 100vh;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
}

.btn:hover {
  background: #333;
  color: white;
}
</style>
