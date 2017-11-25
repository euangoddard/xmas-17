"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/assets/days/1.jpg","740cd1cad22a9b843a6993cc032baae7"],["/assets/days/10.jpg","3dc6b6beaf2e32fb4e0936d56c0ab30c"],["/assets/days/11.jpg","a651564362fb0cd332c311af78dc2116"],["/assets/days/12.jpg","be5daaa424dda41698945baa9d6daa3d"],["/assets/days/13.jpg","b7f203839ea846a9dc9dcf48f9fff249"],["/assets/days/14.jpg","cff5ef02acd301b1f19191c56a41da46"],["/assets/days/15.jpg","ab6be6529cf742f16e04b48f4986f4f1"],["/assets/days/16.jpg","6167081c0a9174d111b687e271f626a7"],["/assets/days/17.jpg","a6faf1affa9b53f9c0b8f1ceff663dc0"],["/assets/days/18.jpg","1868a1e4b4ae989d9215768a9e5494c5"],["/assets/days/19.jpg","f89e92f02ea626f49b4c5d7af88d96c1"],["/assets/days/2.jpg","258cc016d01836e7f26fa6bd713c9fb2"],["/assets/days/20.jpg","178c7b7c2f59ce521e2ea062d8518900"],["/assets/days/21.jpg","44821c6c591ed86823c87625428898c8"],["/assets/days/22.jpg","e39b275b8dd3aa5af88f23abbc536309"],["/assets/days/23.jpg","b0bb83eadc1d476375a9e37d9176640d"],["/assets/days/24.jpg","aead3d2d640863b77311a21f6237202b"],["/assets/days/25.jpg","c8fb28fe75bd5650c855c37cb98ab3a2"],["/assets/days/3.jpg","09ec3372efbf837bb8cd71bb58ee65e6"],["/assets/days/4.jpg","97b5e078c6c285733140736ef8c76454"],["/assets/days/5.jpg","e355dc9c4af2134e56b1719a793cee1a"],["/assets/days/6.jpg","5108e24a4e9ccf8274c6cad3bb265060"],["/assets/days/7.jpg","306b77ed6e7458202fe7299948c1cdc0"],["/assets/days/8.jpg","f5df762b5ee980354b305847fb776231"],["/assets/days/9.jpg","9c405a0981b9a25b439ddfa4a60ad672"],["/assets/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/assets/icons/android-chrome-192x192.png","59e221032ab061cad83b6ce2bcddbde8"],["/assets/icons/android-chrome-512x512.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/assets/icons/apple-touch-icon.png","a0e46feb3cc577478b127936e739dd08"],["/assets/icons/favicon-16x16.png","d712b605ed58419c7e6d4ab885d147b7"],["/assets/icons/favicon-32x32.png","2f7ce797cf8f198dedb9a9f38b7ef13b"],["/assets/icons/mstile-150x150.png","ba817517b2c4e1ba1ce802c4d4fafdb4"],["/bundle.5aa40.js","a9cda9904d379ceeab4cbdd6e9f5ab14"],["/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/index.html","ef3b055ff700a99aa2e7776b7d4240ac"],["/manifest.json","c49a68b203711dbe4f5efb25d8989aa2"],["/route-about.chunk.54180.js","c1f27b7fb94cec21bc95a3b7eee01d41"],["/route-home.chunk.93e3d.js","4713111affc6a1a93d2f451acdd9c67f"],["/style.813ba.css","ca872eebf329139cb11ef4d963cf54a6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var s=new URL(e);return"/"===s.pathname.slice(-1)&&(s.pathname+=a),s.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,s,t){var c=new URL(e);return t&&c.pathname.match(t)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(s)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var s=new URL(a).pathname;return e.some(function(e){return s.match(e)})},stripIgnoredUrlParameters=function(e,a){var s=new URL(e);return s.hash="",s.search=s.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),s.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],s=e[1],t=new URL(a,self.location),c=createCacheKey(t,hashParamName,s,!1);return[t.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(s){if(!a.has(s)){var t=new Request(s,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+s+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(s,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(s){return Promise.all(s.map(function(s){if(!a.has(s.url))return e.delete(s)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,s=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(s))||(s=addDirectoryIndex(s,"index.html"),a=urlsToCacheKeys.has(s));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(s=new URL("index.html",self.location).toString(),a=urlsToCacheKeys.has(s)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(s)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});