importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0b8358e2f29fef7b799d.js",
    "revision": "739a4fdd1f8c34d0e7474aea0cfb9bcd"
  },
  {
    "url": "/_nuxt/0e08b4e8ec881e6069d3.js",
    "revision": "81ca6c2f581da41ac2970be0d3bfb176"
  },
  {
    "url": "/_nuxt/0e4bb7d1989cba877988.js",
    "revision": "568db93c86463f1ab071b92976a61e7b"
  },
  {
    "url": "/_nuxt/15e2c70a87619df71f4e.js",
    "revision": "888092d0287c6cccb035a3c8d5d6d8e5"
  },
  {
    "url": "/_nuxt/1b30fd617f1f5a23670b.js",
    "revision": "b1fb7a5c56a1b8e956e8327fb0b16df4"
  },
  {
    "url": "/_nuxt/3864b6bb3aaf9e3db6c5.js",
    "revision": "85fee2b7c0f244e9a79d16cd07f03fef"
  },
  {
    "url": "/_nuxt/3daa5c1312b527b719d4.js",
    "revision": "3273654e0ca42678e664721e1f079bdd"
  },
  {
    "url": "/_nuxt/3ef2c25c747b057d1877.js",
    "revision": "235af4bf1c1727ecf87a374d64c6f62a"
  },
  {
    "url": "/_nuxt/480dabb5695f707ac6a0.js",
    "revision": "1cac004b121b1ee9a85e58f4abc9b188"
  },
  {
    "url": "/_nuxt/4b7328d233f2040628a0.js",
    "revision": "f80820ca81adc2cc0e9a95bfffa57ba7"
  },
  {
    "url": "/_nuxt/533f8b907390267dac8a.js",
    "revision": "375d608f51246b54e985be4d2468e2d2"
  },
  {
    "url": "/_nuxt/557ded36ec738ab670ab.js",
    "revision": "4bd018ad92c504abbd37e7ab3ac7f73f"
  },
  {
    "url": "/_nuxt/5ae3b2384e8fe9211d6f.js",
    "revision": "617acdbfddd5ed9518dfd0a480c00c09"
  },
  {
    "url": "/_nuxt/5bb55da090756d21b482.js",
    "revision": "072c480f1e193022259dca5d7ce2963d"
  },
  {
    "url": "/_nuxt/6baeb6ffeb4b9b5bc2dd.js",
    "revision": "3c74ce11b46a014f8e1d0acd90bb7716"
  },
  {
    "url": "/_nuxt/78c2e9d71cb14706f88d.js",
    "revision": "c46b993bd6f74b159b60816c7bf50eb3"
  },
  {
    "url": "/_nuxt/7a514f56a04283254791.js",
    "revision": "d98f2f694c7ebb017ba9802668633b30"
  },
  {
    "url": "/_nuxt/7b559eb23ed00ddb62ba.js",
    "revision": "70f42af625bbe70335516f973a574b4b"
  },
  {
    "url": "/_nuxt/7e14b8e2c547817ac17a.js",
    "revision": "67fbfe9921dd555907defa0891175282"
  },
  {
    "url": "/_nuxt/845694855fe4593de6f1.js",
    "revision": "15ef9102fa046c6d7a3cbe3ec4307751"
  },
  {
    "url": "/_nuxt/8b2c8524a11fdb659720.js",
    "revision": "497261b5dfd2d1400fd917d7de18f597"
  },
  {
    "url": "/_nuxt/913178120f2f4ffbd368.js",
    "revision": "eb3a780645d86410348af6cca1130ab2"
  },
  {
    "url": "/_nuxt/9a6272642dd4bfdc8c2b.js",
    "revision": "1537345f416d7a41b517bdbc5344d429"
  },
  {
    "url": "/_nuxt/9c6773b9c069603657b0.js",
    "revision": "628eec494b19a8a1ae1b02eb05584195"
  },
  {
    "url": "/_nuxt/a4df8272b27db8829429.js",
    "revision": "09fafd3745c6c40088d7088b05c1e702"
  },
  {
    "url": "/_nuxt/af69a463c7efbdfdf335.js",
    "revision": "c5546b479db2e8f49b5841bedb608b93"
  },
  {
    "url": "/_nuxt/b7b5650797774d307f92.js",
    "revision": "49f4298a64935d26296737f52a48960f"
  },
  {
    "url": "/_nuxt/bc304d6a0206e1a00be7.js",
    "revision": "518f706721a1ce08763370c27a29973a"
  },
  {
    "url": "/_nuxt/c08f2b10e1033d1dfce8.js",
    "revision": "1c83215cd30e55a6660d1b7c24f7f8cf"
  },
  {
    "url": "/_nuxt/c1df9454c7564110cb59.js",
    "revision": "1496dcdb387d5cf69e94cab2081e4f8d"
  },
  {
    "url": "/_nuxt/d8861b5df8f95a9d1e37.js",
    "revision": "b54e0b913b77ea6b38afd3fd495828f6"
  },
  {
    "url": "/_nuxt/d997fb73927fc09f5b0c.js",
    "revision": "ae63a880193b992e76dc81420fefb2a5"
  },
  {
    "url": "/_nuxt/e46cb977fb68776da7b7.js",
    "revision": "bd28df0217647f7474bb5b685b92760d"
  },
  {
    "url": "/_nuxt/eddae37a91bab0c9555d.js",
    "revision": "321f703b9c1facbbabaa0953e6e811a5"
  }
], {
  "cacheId": "client",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
