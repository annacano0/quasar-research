<script setup>
import documentation from '../assets/documentation.json'
</script>

<template>
  <div class="home-container">
    <h1 class="title">App Documentation</h1>
    <h3 class="subtitle">All about the Quasar components in this app</h3>

    <GoBackBtn />

    <div class="documentation-container">
      <section v-for="section in documentation.sections" :key="section.title" class="section">
        <h2 class="section-title">{{ section.title }}</h2>
        <p class="section-description">{{ section.content }}</p>

        <q-list separator class="item-list">
          <q-item v-for="item in section.items" :key="item.title" class="doc-item">
            <q-item-section>
              <p class="item-title">{{ item.title }}</p>
              <p class="item-content">{{ item.content }}</p>
            </q-item-section>
          </q-item>
        </q-list>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.4rem;
  margin-bottom: 30px;
  color: #555;
}

.back-btn {
  margin-bottom: 40px;
}

.documentation-container {
  text-align: left;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #34495e;
}

.section-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.item-list {
  padding: 0;
}

.doc-item {
  padding: 10px 0;
}

.item-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;
  color: #2c3e50;
}

.item-content {
  font-size: 0.95rem;
  color: #444;
}
</style>
