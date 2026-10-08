MY ROUTINE v3

Upload ALL files in this folder to the root of your GitHub Pages repository:
- index.html
- sw.js
- manifest.json
- icon-192.png
- icon-512.png

Important: do not leave the old sw.js in the repository. The new service worker is versioned as my-routine-v3-0-0 and uses network-first loading for index.html, so GitHub Pages updates are picked up instead of being trapped behind an old cache.

After publishing, open the site once in a normal browser tab. The app will register/update the service worker automatically.
