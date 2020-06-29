import { writable } from 'svelte/store';

export const currentRoute = writable('/');

export function initRouting() {
  const path = window.location.hash;
  currentRoute.set(path);
  if (!history.state) {
    window.history.replaceState({ path: path }, '', window.location.href);
  }
}

export function handlerLinkClick(event) {
  const path = event.target.hash;
  goToRoute(path);
}

export function goToRoute(path) {  
  if (path == null) path = '';
  currentRoute.set(path);
  window.history.pushState({ path: path }, '', window.location.origin + path);
}

export function handlerBackNavigation(event) {
  if (event.state) currentRoute.set(event.state.path)
}
