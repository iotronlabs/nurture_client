importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0445265c2ead7a10bd21.js",
    "revision": "571ef76c233c851ce980b4eb8da69524"
  },
  {
    "url": "/_nuxt/173794e3776672ba00be.js",
    "revision": "8c018f2f3f481a40958714e5456a9711"
  },
  {
    "url": "/_nuxt/1a639a8c59627d6d6805.js",
    "revision": "b69df6277dc7f96f752c1b0b1257faf3"
  },
  {
    "url": "/_nuxt/21e185eeab5a8783f392.js",
    "revision": "1a38b65dadc863a74378b544c82c12b9"
  },
  {
    "url": "/_nuxt/24a998815f35f1060194.js",
    "revision": "daa01d765cfbc9163ea63839dcb13ac6"
  },
  {
    "url": "/_nuxt/32a9e85e9cfd342acc10.js",
    "revision": "7f4c51864fb1056a1f6630fdd58407db"
  },
  {
    "url": "/_nuxt/35ae07b7b6f5bfaccd79.js",
    "revision": "07ddf29e619cd53c7bb822dd690a59b3"
  },
  {
    "url": "/_nuxt/5561916ea5df15e1dbd6.js",
    "revision": "6f56c3dc6b557d93740f511f0505840b"
  },
  {
    "url": "/_nuxt/63a7db76024bc96975cb.js",
    "revision": "d4fab10fc2e824fe9bce70c7e2f9c877"
  },
  {
    "url": "/_nuxt/6bb5b4278f3fe5a91b90.js",
    "revision": "349d20adb04d44278ba3e6f39bd52b82"
  },
  {
    "url": "/_nuxt/6c7670473cec4fffc909.js",
    "revision": "38b6468b7a07fca6b24084c8d593807d"
  },
  {
    "url": "/_nuxt/772ec64e422da0adcce8.js",
    "revision": "f7e49f6f9c94ef91a389dacf57cb04f9"
  },
  {
    "url": "/_nuxt/7ffc7e373aaf409ae44a.js",
    "revision": "5abec52acfa97f928683a92d5b8152a6"
  },
  {
    "url": "/_nuxt/849d975e9e9e7bdd8110.js",
    "revision": "39d810d091d3593ef2cbe34bb10d5874"
  },
  {
    "url": "/_nuxt/864dc47c051cd797b584.js",
    "revision": "353b520f18c1f12a02f8f66885d16340"
  },
  {
    "url": "/_nuxt/899b48fbe0defe732fff.js",
    "revision": "3284243954cea6bed7fa80f973d10a0c"
  },
  {
    "url": "/_nuxt/90074a5fcda1236b246a.js",
    "revision": "7654ff9c924e72766988172644cd8622"
  },
  {
    "url": "/_nuxt/a33822f1dfb627f04322.js",
    "revision": "753d3d781e94b5629362c38a3fc10405"
  },
  {
    "url": "/_nuxt/ab421425baabdcf3649b.js",
    "revision": "0ffe5e997a3ef138aeab95391c668ce8"
  },
  {
    "url": "/_nuxt/b03ba3fa5a21b6fbf75a.js",
    "revision": "c6cf2d2f681cd5b513ac76761a72fca6"
  },
  {
    "url": "/_nuxt/b7a90e1bc3097fe3471b.js",
    "revision": "5a8950ac18b31ba020ff88b5ba65de2c"
  },
  {
    "url": "/_nuxt/bcdb654d234bf08ae7c0.js",
    "revision": "23d7351b5621f207d02fd764baa103e2"
  },
  {
    "url": "/_nuxt/bde401b0d3f51b058148.js",
    "revision": "4b3817e2609079abe8d07f37900d9e22"
  },
  {
    "url": "/_nuxt/c67bcdeeac48ca06d476.js",
    "revision": "a28424495907e451e7a6bd08bd656367"
  },
  {
    "url": "/_nuxt/cbdc98dc7dd1970c24e2.js",
    "revision": "b59003d78d3a50a81d792ec8c46034e5"
  },
  {
    "url": "/_nuxt/d03c08a93c2f1dbfded9.js",
    "revision": "e50325b52af5175c7eafd90f11838abe"
  },
  {
    "url": "/_nuxt/d75a55269d4693245cc7.js",
    "revision": "c053b3b7775593c3cec3cce6b365ef92"
  },
  {
    "url": "/_nuxt/d773585a421eda163b2a.js",
    "revision": "1b6084b0a1921cb845872488d0fa4548"
  },
  {
    "url": "/_nuxt/d80a5b07fa50e88bd94c.js",
    "revision": "3729e13353081e15dede12a559e5c8a1"
  },
  {
    "url": "/_nuxt/eae6d69cebc8336c1e6f.js",
    "revision": "970f3bbacd08b00120a14fe326bce9a8"
  },
  {
    "url": "/_nuxt/ef72f1ad8641c8e9e731.js",
    "revision": "7c08417c54d06a5dcb6061b3e151deea"
  },
  {
    "url": "/_nuxt/f4c6c6b1fbeeea3efd50.js",
    "revision": "f99530deadfc66b387977e3860b8936b"
  },
  {
    "url": "/_nuxt/fdeea79ec073c3f6d2da.js",
    "revision": "e4c431159293d9695a20ca3be2a89690"
  },
  {
    "url": "/_nuxt/ff0e50d8a5331f0ed66b.js",
    "revision": "2c769d3bcc7191df77340bc35d647b50"
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
