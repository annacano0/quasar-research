<script setup>
import FavouriteCard from 'src/components/FavouriteCard.vue'

const favourites = JSON.parse(localStorage.getItem('favourites')) || []
</script>

<template>
  <div class="home-container">
    <h1 class="title">Your favourites</h1>
    <GoBackBtn />

    <div v-if="favourites.length > 0" class="favs-container">
      <FavouriteCard v-for="cocktail in favourites" :key="cocktail.idDrink" :cocktail="cocktail" />
    </div>
    <p v-else class="no-favs">There are no favourites yet 😔</p>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  text-align: center;
  padding: 40px 20px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.favs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.no-favs {
  font-size: 1.2rem;
  color: #888;
  margin-top: 40px;
}
</style>
