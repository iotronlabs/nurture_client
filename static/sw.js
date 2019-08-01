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
    "url": "/_nuxt/0808d1a433ca8b616ff7.js",
    "revision": "fa68f7a4162b88eaeffe4395b4fe826a"
  },
  {
    "url": "/_nuxt/12c13d0260fb073e2482.js",
    "revision": "53cabda418ebe120f2f72a72f54a4070"
  },
  {
    "url": "/_nuxt/161424bf37c7a9fe60ce.js",
    "revision": "72aa069163e54db8e0e527006933e27c"
  },
  {
    "url": "/_nuxt/2dc9cb9afcb62eabd6cd.js",
    "revision": "e9fd860434fd5435042e4c9b7e7802e4"
  },
  {
    "url": "/_nuxt/30d629ee468c7cbc04ec.js",
    "revision": "19db04e5004648614c231bbb98da1f3c"
  },
  {
    "url": "/_nuxt/3cbc864183f5650426f8.js",
    "revision": "e69790420f5a9c521fc6259eb54eb984"
  },
  {
    "url": "/_nuxt/3d1d131c3eab52bbd064.js",
    "revision": "74ec660a2f1d6f47f144eb35b310027f"
  },
  {
    "url": "/_nuxt/414ff5b7ea7aa3ba85d8.js",
    "revision": "36414653142c7d80cf235de8ba920b11"
  },
  {
    "url": "/_nuxt/6a450978ccca7785e4a4.js",
    "revision": "53d058e83e4977d26ebce40b2c63a5b3"
  },
  {
    "url": "/_nuxt/6fb62f74b5a79afe98ce.js",
    "revision": "1fadb6f92aec9ccab29b7a1c60e8d865"
  },
  {
    "url": "/_nuxt/777f1060a6abbdbd45f2.js",
    "revision": "e33f4f98a5cd18916af15ab51a9cf5f7"
  },
  {
    "url": "/_nuxt/78e4701a8b144e3f3b89.js",
    "revision": "a7ccd577cfc8fd74d7732bc241a66079"
  },
  {
    "url": "/_nuxt/8ecb3e426338baeb0c79.js",
    "revision": "269d857170a63300adfd0e1ff7b9973d"
  },
  {
    "url": "/_nuxt/9062caf035d1e3d7ab4b.js",
    "revision": "85a7d8030c1cc60291319da5c93a7adc"
  },
  {
    "url": "/_nuxt/994f44890fa9d73c826c.js",
    "revision": "525eb473a7ebf804a8ea0b6b901c198b"
  },
  {
    "url": "/_nuxt/9bd9b59bbb7b499f3655.js",
    "revision": "862a3c65ab6af11173494a95319ae2bb"
  },
  {
    "url": "/_nuxt/9fbed59075a18d0817de.js",
    "revision": "d4c7b77ee48e606fb514a8f4cc84b345"
  },
  {
    "url": "/_nuxt/ad657811671141ed8c49.js",
    "revision": "0de32e2387b7eaf6163360e8fc9aff11"
  },
  {
    "url": "/_nuxt/b4a736f840b02879117c.js",
    "revision": "fdd91c56d2244bfba960a066eb4d0358"
  },
  {
    "url": "/_nuxt/bca35faa15e3e6d49644.js",
    "revision": "944b5f13984a78a08fa7fb3463a343c3"
  },
  {
    "url": "/_nuxt/cbaa55f622631f4f6bfc.js",
    "revision": "2ccc0b0202f1a87255be926331b472fb"
  },
  {
    "url": "/_nuxt/ddab706cfa76dfe1a53c.js",
    "revision": "5c1cb7139b300ad0abdb7d704ec79fce"
  },
  {
    "url": "/_nuxt/ddf3e3bb95a649eda9b8.js",
    "revision": "f4850844f068f76479515c44860ad68b"
  },
  {
    "url": "/_nuxt/e981b7f9a8e159655b03.js",
    "revision": "bcefce6004de2e0ef485209e846356e9"
  },
  {
    "url": "/_nuxt/f163aaaf1d5e5cdc7966.js",
    "revision": "685098d694bf119bb6a49b2d9ac49547"
  },
  {
    "url": "/_nuxt/f31cf095eebe84a65330.js",
    "revision": "6bcdf931c0fd20fa1191e40c18f0526f"
  },
  {
    "url": "/_nuxt/f35cf392a88c3111181d.js",
    "revision": "6db0f854b57e5a7bde70cd085a414f7a"
  },
  {
    "url": "/_nuxt/f3922ed0115363b548f0.js",
    "revision": "f2050d03e8adb636affa89e6661b7471"
  },
  {
    "url": "/_nuxt/fc284f68564d3c1b9fcc.js",
    "revision": "cff9cce6e7aaf79baceded25f8d69518"
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
