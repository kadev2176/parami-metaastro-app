/**
 * @ Author: Hikaru
 * @ Create Time: 2022-07-08 05:32:33
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 02:14:14
 * @ Description: i@rua.moe
 */

import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('head').append([
      `<script
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtbySOJ64uFpKjCJ3v21MypTZ2d7LuwW8&libraries=places&region=US&language=en"
      ></script>`,
    ])
    return $;
  });

  api.addHTMLMetas(() => {
    return [
      {
        name: 'keywords',
        content: 'meta,astro,metaverse,soul,nft,blockchain',
      },
      {
        name: 'description',
        content: 'MetaAstro indicates individual characteristics that can be used to predict one\'s future using web3 technology.',
      },
      {
        name: 'fortmatic-site-verification',
        content: '9iTERsNWLsnhTNeU',
      }
    ]
  });

  api.addHTMLLinks(() => {
    return [
      {
        rel: 'icon',
        href: '/images/background/moon.svg',
        type: 'image/x-icon',
      },
    ]
  });
};
