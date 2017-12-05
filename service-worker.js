// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//var dataCacheName = 'weatherData-v1';
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
	'/',
	'/Home23.html',
	'/index.html',	
	'/feedback_form.html',
	'/faculty_acc.html',
	'/Admin.html',
	'/student_account.html',
	'/js/script.js',
	'/js/dropdown.js',
	'/js/index.js',
	'/js/student_acc.js',
    '/css/style.scss',
	'/css/Admin.css',
	'/css/faculty_acc.css',
	'/css/feedback_form.css',
	'/css/Home.css',
	'/css/student_acc.css',
	'/css/style.css',
	'/css/image/14954343986.jpg',
	'/css/image/143288557211.jpg',
	'/css/image/149543429616.jpg',
	'/css/image/LPU-medical-courses-2.jpg',
	'/image/14954343986.jpg',
	'/image/143288557211.jpg',
	'/image/149543429616.jpg',
	'/image/149543429625.jpg',
	'/image/LPU-medical-courses-2.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName ) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
	console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
*/
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });}));});
*/
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    promiseAny([
      caches.match(event.request),
      fetch(event.request)
    ]));});
*/


/*
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
   
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
*/

/*
self.addEventListener('notificationclick',function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var a = e.action;
  if(a === 'close'){
	  notification.close();
  }else{
	  clients.openWindow('https://www.google.com');
	  notification.close();
  }

  //console.log("Notification Clicked right now "+a);
});
*/
/*
self.addEventListener('notificationclose',function(e) {
  var n = e.notification;
  var p = n.data.primaryKey;
  console.log('Lovely Notification Closed '+p);
});
*/
