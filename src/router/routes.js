const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'cocktails', component: () => import('pages/CocktailListPage.vue') },
      {
        path: 'cocktails/random',
        component: () => import('pages/CocktailDetailPage.vue'),
        props: { isRandom: true },
      },
      {
        path: 'cocktails/:id',
        component: () => import('pages/CocktailDetailPage.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
