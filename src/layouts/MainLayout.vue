<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white no-decoration">Sip & Shake</router-link>
        </q-toolbar-title>
        <div class="btn-container">
          <q-btn
            flat
            dense
            icon="favorite"
            label="Favourites"
            unelevated
            to="/favourites"
            no-caps
            class="text-white"
          />

          <q-btn
            flat
            dense
            icon="code"
            label="annacano0"
            href="https://github.com/annacano0"
            target="_blank"
            no-caps
            class="text-white"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="css" scoped>
.no-decoration {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.btn-container {
  display: flex;
  gap: 15px;
}
</style>
