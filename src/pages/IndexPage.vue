<template>
  <div class="home-container">
    <h1 class="title">Sip & Shake</h1>
    <h3 class="subtitle">Select how to search for your drink</h3>
    <div class="button-container">
      <q-btn to="/cocktails" label="Search" class="btn" />
      <q-btn to="/cocktails/random" label="Randomize" class="btn" />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  gap: 15px;
}

.btn {
  background: white;
  color: black;
  font-size: 1.2rem;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease-out;
}

.btn:hover {
  background: #333;
  color: white;
}
</style>
