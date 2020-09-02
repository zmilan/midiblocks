const routes = [
  {
    path: '/',
    component: () => import('layouts/Midiblock.vue'),
    children: [
      { 
        name: 'midiblocksHome',
        path: '/', component: () => import('pages/Index.vue')
      },
      {
        name: 'midiblocksCode',
        path: '/code', component: () => import('pages/Code.vue') }
    ]
  },

  {
    path: '/block',
    component: () => import('layouts/ReadOnly.vue'),
    children: [
      {
        name: 'readOnlyHome',
        path: ':id', component: () => import('pages/Block404.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
