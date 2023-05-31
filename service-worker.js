const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
  ]
  
  const getFixedUrl = (req) => {
    var now = Date.now()
    var url = new URL(req.url)
    url.protocol = self.location.protocol
    if (url.hostname === self.location.hostname) {
      url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
    }
    return url.href
  }
  
  // Track whether the game has been installed
  let isInstalled = false;
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
  })
  
  self.addEventListener('fetch', event => {
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
      const cached = caches.match(event.request)
      const fixedUrl = getFixedUrl(event.request)
      const fetched = fetch(fixedUrl, { cache: 'no-store' })
      const fetchedCopy = fetched.then(resp => resp.clone())
  
      event.respondWith(
        Promise.race([fetched.catch(_ => cached), cached])
          .then(resp => resp || fetched)
          .catch(_ => { /* eat any errors */ })
      )
  
      event.waitUntil(
        Promise.all([fetchedCopy, caches.open("pwa-cache")])
          .then(([response, cache]) => {
            if (response.ok) {
              // Update the cache with the fetched version
              cache.put(event.request, response);
  
              // If the game is not installed and the request is for the game's HTML file
              if (!isInstalled && event.request.url.includes('game.html')) {
                // Show a message indicating that the game is better played as an app
                self.clients.matchAll({ type: 'window' }).then(clients => {
                  clients.forEach(client => {
                    client.postMessage({ action: 'showInstallMessage' });
                  });
                });
              }
            }
          })
          .catch(_ => { /* eat any errors */ })
      )
    }
  })
  
  // Listen for messages from the game's pages
  self.addEventListener('message', event => {
    if (event.data.action === 'gameInstalled') {
      // Set the isInstalled flag to true when the game is installed
      isInstalled = true;
    }
  });
  