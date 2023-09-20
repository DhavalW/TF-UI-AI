/** @format */

import {writable, get} from "svelte/store";
import localforage from "localforage";

const storageKey = "selection";
export const selectionStore = writable({});

localforage.getItem(storageKey).then((data) => {
	selectionStore.update((d) => data || {});
});

let timer = null;
selectionStore.save = () => {
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		const data = get(selectionStore);
		localforage.setItem(storageKey, data);
		timer = null;
	}, 500);
};
