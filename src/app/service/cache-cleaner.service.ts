import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheCleanerService {

  constructor() { }

  clearCache(): void {
    if ('caches' in window) {console.log('cache----')
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
  }
  
}
