importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/001f031733b2ccfbe7f0.js",
    "revision": "054c184ceb49b3abb6eaf45808170824"
  },
  {
    "url": "/_nuxt/0308dc744c6dd1491c7f.js",
    "revision": "917eb159d3cf2afb2ecda173fcf35946"
  },
  {
    "url": "/_nuxt/050697c78fb97c61ab4c.js",
    "revision": "f2050d03e8adb636affa89e6661b7471"
  },
  {
    "url": "/_nuxt/0c0598d7a746c2a60dc1.js",
    "revision": "e9fd860434fd5435042e4c9b7e7802e4"
  },
  {
    "url": "/_nuxt/24aaeb012fdb8da085ae.js",
    "revision": "2ccc0b0202f1a87255be926331b472fb"
  },
  {
    "url": "/_nuxt/291fa92e2a3dc979eed6.js",
    "revision": "5c1cb7139b300ad0abdb7d704ec79fce"
  },
  {
    "url": "/_nuxt/2cd9379995752309f42d.js",
    "revision": "83c44f74df4045fe39fee63a00f65776"
  },
  {
    "url": "/_nuxt/30d629ee468c7cbc04ec.js",
    "revision": "19db04e5004648614c231bbb98da1f3c"
  },
  {
    "url": "/_nuxt/343e1b42ed99276a54b2.js",
    "revision": "fa68f7a4162b88eaeffe4395b4fe826a"
  },
  {
    "url": "/_nuxt/3592c5c5bcbc6ebd4035.js",
    "revision": "f4850844f068f76479515c44860ad68b"
  },
  {
    "url": "/_nuxt/3d1d131c3eab52bbd064.js",
    "revision": "74ec660a2f1d6f47f144eb35b310027f"
  },
  {
    "url": "/_nuxt/4b6bb218bff190b034b7.js",
    "revision": "53cabda418ebe120f2f72a72f54a4070"
  },
  {
    "url": "/_nuxt/4bd08d5810224285a240.js",
    "revision": "cff9cce6e7aaf79baceded25f8d69518"
  },
  {
    "url": "/_nuxt/4bd58022876ca612a42f.js",
    "revision": "85a7d8030c1cc60291319da5c93a7adc"
  },
  {
    "url": "/_nuxt/4c68b93a1a99eb7b4398.js",
    "revision": "6db0f854b57e5a7bde70cd085a414f7a"
  },
  {
    "url": "/_nuxt/4cc58ddd07d465cc1f09.js",
    "revision": "d58e66ac978ec3e672485b4c7ab8c777"
  },
  {
    "url": "/_nuxt/604b9604dc932d433a85.js",
    "revision": "2759c32bd4a196fac3378be412c1e859"
  },
  {
    "url": "/_nuxt/6a450978ccca7785e4a4.js",
    "revision": "53d058e83e4977d26ebce40b2c63a5b3"
  },
  {
    "url": "/_nuxt/6bdc3603c654feee9ac3.js",
    "revision": "bcefce6004de2e0ef485209e846356e9"
  },
  {
    "url": "/_nuxt/7365050d914213aec10d.js",
    "revision": "36414653142c7d80cf235de8ba920b11"
  },
  {
    "url": "/_nuxt/78e4701a8b144e3f3b89.js",
    "revision": "a7ccd577cfc8fd74d7732bc241a66079"
  },
  {
    "url": "/_nuxt/7a79ff7dd59b34491764.js",
    "revision": "1fadb6f92aec9ccab29b7a1c60e8d865"
  },
  {
    "url": "/_nuxt/8525a9410fd125a6c2e2.js",
    "revision": "269d857170a63300adfd0e1ff7b9973d"
  },
  {
    "url": "/_nuxt/9bd9b59bbb7b499f3655.js",
    "revision": "862a3c65ab6af11173494a95319ae2bb"
  },
  {
    "url": "/_nuxt/aba5cba0d5066d62ba78.js",
    "revision": "525eb473a7ebf804a8ea0b6b901c198b"
  },
  {
    "url": "/_nuxt/ad657811671141ed8c49.js",
    "revision": "0de32e2387b7eaf6163360e8fc9aff11"
  },
  {
    "url": "/_nuxt/bca35faa15e3e6d49644.js",
    "revision": "944b5f13984a78a08fa7fb3463a343c3"
  },
  {
    "url": "/_nuxt/c62eebdad7c186cf0689.js",
    "revision": "e69790420f5a9c521fc6259eb54eb984"
  },
  {
    "url": "/_nuxt/dbaa645b18a980dda2bf.js",
    "revision": "d6d2ce98f0df5e9ecb1429b82505f59d"
  },
  {
    "url": "/_nuxt/f31cf095eebe84a65330.js",
    "revision": "6bcdf931c0fd20fa1191e40c18f0526f"
  },
  {
    "url": "/_nuxt/f7ca89f3456855d7084a.js",
    "revision": "a5401cbf83a35f1e2d0e63601383e8a4"
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
