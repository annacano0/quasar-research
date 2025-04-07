<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>
<template>
  <div class="home-container">
    <h1 class="title">App documentation</h1>
    <h3 class="subtitle">All about the quasar components in this app</h3>
    <q-btn
      label="Go Back"
      icon="arrow_back"
      color="white"
      text-color="black"
      @click="goBack"
      class="back-btn"
    />
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
