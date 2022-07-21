/**
 * @ Author: Hikaru
 * @ Create Time: 2022-02-18 15:19:58
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:09:31
 * @ Description: i@rua.moe
 */

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
    component: './Mint',
  },
  {
    path: '/breed',
    name: 'Breed Your MetaAstro',
    hideInMenu: true,
    component: './Breed',
  },
  {
    component: './404',
  },
];
