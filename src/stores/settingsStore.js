/** @format */

import {writable, get} from "svelte/store";
import localforage from "localforage";

const storageKey = "settings";
export const settingsStore = writable({});

localforage.getItem(storageKey).then((data) => {
	settingsStore.update((d) => data || {});
});

let timer = null;
settingsStore.save = () => {
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		const data = get(settingsStore);
		localforage.setItem(storageKey, data);
		timer = null;
	}, 500);
};
