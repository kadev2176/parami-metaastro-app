export default [
  {
    path: '/',
    name: '',
    hideInMenu: true,
    component: './Index',
  },
  {
    path: '/mint',
    name: 'Mint Your MetaAstro',
    hideInMenu: true,
    component: './Astro/Mint',
  },
  {
    path: '/breed',
    name: 'Breed Your MetaAstro',
    hideInMenu: true,
    component: './Astro/Breed',
  },
  {
    component: './404',
  }
];
