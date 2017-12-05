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
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

//for Notification
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

self.addEventListener('notificationclose',function(e) {
  var n = e.notification;
  var p = n.data.primaryKey;
  console.log('Lovely Notification Closed '+p);
});
