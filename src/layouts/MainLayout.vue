<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link to="/" class="text-white no-decoration">Sip & Shake</router-link>
        </q-toolbar-title>

        <div>
          Made by
          <a href="https://github.com/annacano0" target="_blank" class="no-decoration">annacano0</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Go to homepage',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Github',
    caption: 'See source code',
    icon: 'code',
    link: 'https://github.com/annacano0/quasar-research',
  },
  {
    title: 'API Documentation',
    caption: 'Cocktail API Reference',
    icon: 'info',
    link: 'https://www.thecocktaildb.com/api.php',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="css" scoped>
.no-decoration {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
