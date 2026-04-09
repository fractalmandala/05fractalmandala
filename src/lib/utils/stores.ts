import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedMenuMode = browser ? JSON.parse(localStorage.getItem('menuMode') || 'false') : false;
export const menuMode = writable(storedMenuMode)
export function toggleMenu(){
  if (browser) {
    menuMode.update((mode) => {
      const newMode = !mode;
      localStorage.setItem('menuMode', JSON.stringify(newMode));
      return newMode;
    })
  }
}
