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

const storedSearchMode = browser ? JSON.parse(localStorage.getItem('searchMode') || 'false') : false;
export const searchMode = writable(storedSearchMode)
export function toggleSearch(){
	if (browser) {
		searchMode.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('searchMode', JSON.stringify(newMode));
			return newMode;
		})
	}
}

const storedDarkTheme = browser ? JSON.parse(localStorage.getItem('darkTheme') || 'false') : false;
export const darkTheme = writable(storedDarkTheme)
export function toggleTheme(){
	if (browser) {
		darkTheme.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('darkTheme', JSON.stringify(newMode));
			return newMode;
		})
	}
}
