importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0c733afd9dc5446db633.js",
    "revision": "bbbf20ab22b60cd793929cb7564edc9a"
  },
  {
    "url": "/_nuxt/0f38d989dcc9499bdc6f.js",
    "revision": "2c74e986b6dff50b90bf41904ec10eb0"
  },
  {
    "url": "/_nuxt/1c864ba90ddc092671dc.js",
    "revision": "9b3aa740f526526ffe90f106b52b80e7"
  },
  {
    "url": "/_nuxt/2f47ce7a0ae80a184335.js",
    "revision": "dc32b54bdc74325e32e4fdf1c000e426"
  },
  {
    "url": "/_nuxt/311b79b04a9a9a409819.js",
    "revision": "dfcd5b0f75d4571157951753f8d6e78a"
  },
  {
    "url": "/_nuxt/3297f0c0cfc5a5de40ac.js",
    "revision": "304befb8b67d3701e982d536365a84e5"
  },
  {
    "url": "/_nuxt/36586699b89533e9d778.js",
    "revision": "6a568ba44de79486c425ffb68fdfa931"
  },
  {
    "url": "/_nuxt/394287a3fbfe100e19c9.js",
    "revision": "e83895dfd94b308e1e595168e08ef2f0"
  },
  {
    "url": "/_nuxt/3a332652cf9d405363d1.js",
    "revision": "bcc665bce4a937d8320f7d32dcf63527"
  },
  {
    "url": "/_nuxt/3c353fb13c9f6eb68173.js",
    "revision": "24d72fbe5fe20811623d7465f48f36b9"
  },
  {
    "url": "/_nuxt/42ac177518acc2a33cc2.js",
    "revision": "ea0c4630ed231a0e8efe5d48ca3f2cd7"
  },
  {
    "url": "/_nuxt/4d8f9e8b0b8f3c0e4632.js",
    "revision": "b394193c5483d2f8e660a77a4d09873d"
  },
  {
    "url": "/_nuxt/56fdadfef834acfba826.js",
    "revision": "38af6383c8fb8f3f449d3c1903f59dd3"
  },
  {
    "url": "/_nuxt/6306232f3cb59829cc28.js",
    "revision": "cd41065be0f789fcc445f1986d939aae"
  },
  {
    "url": "/_nuxt/678ff39c5656500df259.js",
    "revision": "0ee78babd2cba79f55510707fa446319"
  },
  {
    "url": "/_nuxt/75a2da0008463de812cb.js",
    "revision": "087136a53e157d4e6139722486aaffe3"
  },
  {
    "url": "/_nuxt/7ef0aa29ad5f640ea319.js",
    "revision": "d7a2c7667ee89c8f1cd23b0a2dd9f82b"
  },
  {
    "url": "/_nuxt/819a9f7b38a7f1ce4876.js",
    "revision": "d2f9800522cefacba3c232c97dea75ae"
  },
  {
    "url": "/_nuxt/84bfc45173d8cb0cdf73.js",
    "revision": "09fcee34d0d15ae851cf114eca0c3adf"
  },
  {
    "url": "/_nuxt/8a5febe7e14a9df073bc.js",
    "revision": "0ebfa8059ab9e9745459282e21d3207e"
  },
  {
    "url": "/_nuxt/8bf17c3901422b78589c.js",
    "revision": "b6aab61d127dd66bdd3bd8c4f05dd6ac"
  },
  {
    "url": "/_nuxt/94fcb920c94c441f3348.js",
    "revision": "9b7958b8b125d0309ea25bd6ea37bcd0"
  },
  {
    "url": "/_nuxt/a1082e0e6a23b28c6dcb.js",
    "revision": "97ac7256c0dd0ad5437eae2a7917f5f2"
  },
  {
    "url": "/_nuxt/ab68f71aa97d7446cddb.js",
    "revision": "de722fb4c21b2439cafd44d8abb765e5"
  },
  {
    "url": "/_nuxt/b0d775f0173416c7c76e.js",
    "revision": "136ff6f84b73372c95d3ec2817c474dc"
  },
  {
    "url": "/_nuxt/b102c44172ff6fc0b3e8.js",
    "revision": "7b4a73ce9e93f4760d7530f4875c6282"
  },
  {
    "url": "/_nuxt/b54c9240d6446dc07ffa.js",
    "revision": "8f5ede48fae400853b26c2951b624825"
  },
  {
    "url": "/_nuxt/be6ed97ce07c13d73801.js",
    "revision": "a88a66925b3c34c0ee87d87bda4099ea"
  },
  {
    "url": "/_nuxt/c17010d8beb406a8ea3c.js",
    "revision": "3a1b96d67890ac45299a1e790ca5a9b5"
  },
  {
    "url": "/_nuxt/c2413a8a934c67461281.js",
    "revision": "c4b41cd450bb526bf4bb2fd36e078327"
  },
  {
    "url": "/_nuxt/c50b3674b357c2c990dd.js",
    "revision": "8d655468534fb70b4b4f508e0803ca96"
  },
  {
    "url": "/_nuxt/d79e3d91c0d031e24afe.js",
    "revision": "91966d783fab7f987de4bf6c2bf65c80"
  },
  {
    "url": "/_nuxt/e3b85dc33473b994dbd1.js",
    "revision": "7a988cb50b97eaf7d183916352d630bf"
  },
  {
    "url": "/_nuxt/e87f3f1dd9a2f17de593.js",
    "revision": "6949424ccc24bc94ebe5ae84a7ccf406"
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
