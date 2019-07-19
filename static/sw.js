importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0ea92fc661b9650e59aa.js",
    "revision": "095b3dc22214c5ab73003d421efe6277"
  },
  {
    "url": "/_nuxt/301d1cf859ed5410eb5a.js",
    "revision": "fd36ad093b6ceda5c18c9d7831546e39"
  },
  {
    "url": "/_nuxt/3da00c0bacb7391c3a27.js",
    "revision": "b615bf1b164d7d1ec6f77cb4c442ac61"
  },
  {
    "url": "/_nuxt/3ebe989773854c5bdf3b.js",
    "revision": "3fa9817997bb6fb158a82e417edb68a8"
  },
  {
    "url": "/_nuxt/46faef3972c848058226.js",
    "revision": "e9c9ad169ab6d4931363a435edc73cc8"
  },
  {
    "url": "/_nuxt/4b18d80adf8f252f230c.js",
    "revision": "afd2314223d921be86af0f087e7f2776"
  },
  {
    "url": "/_nuxt/595fde20c7018ebdebad.js",
    "revision": "e1751168619592b1d8888fbf56fef220"
  },
  {
    "url": "/_nuxt/64e3c89bb2f6fcc84a00.js",
    "revision": "4d0a873456fa51f0dfd18c83516613c3"
  },
  {
    "url": "/_nuxt/70c7ccbe6550a0740d8e.js",
    "revision": "20d35751d8720f086d3099131f51ac54"
  },
  {
    "url": "/_nuxt/77acbce27aa9f953d2a4.js",
    "revision": "1fd9ad183a8c48d01f806daccbae8b56"
  },
  {
    "url": "/_nuxt/7974984124abd44b0da7.js",
    "revision": "d0333a31caa81cf6c5fc32a5040dbde6"
  },
  {
    "url": "/_nuxt/7e313e703186a1e15505.js",
    "revision": "10999fd676489d78b3d4637ed8278304"
  },
  {
    "url": "/_nuxt/8176ec22144c1ef60997.js",
    "revision": "c68be49a2cec6dc9d032b21fbef0abf1"
  },
  {
    "url": "/_nuxt/874ff0c314317d4ad3cb.js",
    "revision": "bfe6d09191563e9a44fcd97df6587a1d"
  },
  {
    "url": "/_nuxt/896bc8d845d5de75c543.js",
    "revision": "8b06192c374f9b55332520e531ae2707"
  },
  {
    "url": "/_nuxt/8a2dacecd7f44fd54fdf.js",
    "revision": "41d7791ad27e3fecfc61643d9a807191"
  },
  {
    "url": "/_nuxt/8f575e143e7ba20a8bd5.js",
    "revision": "c3ebf7a9aee828e05362fdb5b50741bd"
  },
  {
    "url": "/_nuxt/913178120f2f4ffbd368.js",
    "revision": "eb3a780645d86410348af6cca1130ab2"
  },
  {
    "url": "/_nuxt/9170f82d53645a105aae.js",
    "revision": "63d09323d4194edf24b2acea2ca4a692"
  },
  {
    "url": "/_nuxt/91842875c07fb4c248fd.js",
    "revision": "5a86452ec460c91459847767b1705d12"
  },
  {
    "url": "/_nuxt/926f01d6a2d42dc8e09c.js",
    "revision": "897f07a583dfbf241a8a6b906836d710"
  },
  {
    "url": "/_nuxt/92a09b44c8bc37a323e3.js",
    "revision": "d58132432da6214407e8917baf5ee94b"
  },
  {
    "url": "/_nuxt/9f1d017e03e1b99f4428.js",
    "revision": "3e9d73a831156e0b1a97e4eba73b49ef"
  },
  {
    "url": "/_nuxt/ab49787c9203cb8de594.js",
    "revision": "bc2567ce3955067955274d74d44ec7a5"
  },
  {
    "url": "/_nuxt/b04f76d09f87dd0136df.js",
    "revision": "cb103c9b693166bb18c509fdf7e60e81"
  },
  {
    "url": "/_nuxt/b7a8f5996188023299d5.js",
    "revision": "7899c2ec9485c7250f3181f1fcd67735"
  },
  {
    "url": "/_nuxt/bc304d6a0206e1a00be7.js",
    "revision": "518f706721a1ce08763370c27a29973a"
  },
  {
    "url": "/_nuxt/bde5392e20459e621657.js",
    "revision": "211037278e953c609e03a64270ed204f"
  },
  {
    "url": "/_nuxt/c30e8c52dc6416ec2fd3.js",
    "revision": "d536727553c233e7292d6b923e56c7b4"
  },
  {
    "url": "/_nuxt/e027671660b67038baa0.js",
    "revision": "0fc857848b1b3ae08fca9fe9c2c85493"
  },
  {
    "url": "/_nuxt/e11a36edc290cb198914.js",
    "revision": "d4a898ad74629c1e129cd35eebb76027"
  },
  {
    "url": "/_nuxt/e46cb977fb68776da7b7.js",
    "revision": "bd28df0217647f7474bb5b685b92760d"
  },
  {
    "url": "/_nuxt/efba238bbe56cda3704c.js",
    "revision": "c304fc1f875b85ff1ff61c47c7e0b076"
  },
  {
    "url": "/_nuxt/f65bfb37bfeeae542786.js",
    "revision": "9ed260839c098e36749d657982510053"
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
