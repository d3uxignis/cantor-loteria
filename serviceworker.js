// Nombre de la caché
const CACHE_NAME = 'loteria-mexicana-v1';

// Archivos para cachear inicialmente
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './cartas/0.PNG'
];

// Añadir todas las cartas a la caché
for (let i = 1; i <= 54; i++) {
  urlsToCache.push(`./cartas/${i}.jpg`);
}

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error al cachear archivos iniciales:', error);
      })
  );
});

// Activar el Service Worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estrategia de caché: Cache First, luego red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si encontramos el recurso en la caché, lo devolvemos
        if (response) {
          return response;
        }
        
        // Si no está en la caché, lo solicitamos a la red
        return fetch(event.request)
          .then(response => {
            // No cacheamos respuestas que no sean válidas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para poder guardarla en caché y devolverla
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Error de fetch:', error);
            // Aquí podrías devolver una página de fallback para errores offline
            // Por ejemplo, si es una imagen de carta, devolver una carta genérica
            if (event.request.url.includes('/cartas/')) {
              return caches.match('./cartas/error.jpg');
            }
          });
      })
  );
});

// Evento para cuando la app pasa a estado offline
self.addEventListener('offline', () => {
  console.log('La aplicación está ahora offline');
});

// Evento para cuando la app vuelve a estar online
self.addEventListener('online', () => {
  console.log('La aplicación está ahora online');
});