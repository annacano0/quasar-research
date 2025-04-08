# 🥤 Sip & Shake — Aplicació de còctels amb Quasar

Sip & Shake és una aplicació SPA desenvolupada amb Quasar Framework i Vue.js, pensada per explorar còctels, veure’n els detalls i gestionar una llista de favorits. El projecte inclou funcionalitats com cerca amb filtres, càrrega d’informació des d’una API externa, gestió de favorits amb localStorage, i documentació interna del projecte.

## Preview

<img width="495" alt="Screenshot 2025-04-08 at 15 59 46" src="https://github.com/user-attachments/assets/ae602ab9-a1e3-4838-864c-f770bc5d73fb" />


## 🔁 Flux de navegació

El component principal IndexPage.vue actua com a punt central de navegació cap a les següents seccions:

### 🔍 Buscar còctels → `CocktailListPage.vue`

- Utilitza una API externa per obtenir una llista filtrada.
- Permet accedir als detalls d’un còctel seleccionat (`CocktailDetailPage.vue`).

### 🎲 Obtenir còctel aleatori → `CocktailDetailPage.vue`

- Mostra els detalls d’un còctel random obtingut via API.

### 📄 Veure documentació → `DocumentationPage.vue`

- Carrega dades des d’un fitxer JSON local dins `src/assets`.

### ⭐ Accedir als favorits → `FavouritesPage.vue`

- Llegeix les dades des de `localStorage`.


## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
