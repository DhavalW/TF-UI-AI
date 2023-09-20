/** @format */

console.log('hi starting...');

import {writable, get} from "svelte/store";
import localforage from "localforage";

const storageKey = "worktree";
export const treeStore = writable([]);

const stock = genStockData(10).reverse();
localforage.getItem(storageKey).then((data) => {
	treeStore.update((d) => data || stock);
});

let timer = null;
treeStore.save = () => {
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		const data = get(treeStore);
		localforage.setItem(storageKey, data);
		timer = null;
	}, 500);
};

function genStockData(count) {
	return Array(count)
		.fill(0)
		.map((x, i) => {
			return {
				versionTag: `v${i}`,
				prompt: `oogabooga v${i}`,
				html: `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Svelte & Bootstrap Template</title>
					<!-- Latest Svelte version CDN -->
					<script defer src="https://cdn.jsdelivr.net/npm/svelte@3.42.4/dist/svelte.js"></script>
				
					<!-- Latest Bootstrap CSS and JS CDNs -->
					<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/css/bootstrap.min.css" rel="stylesheet">
					<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/js/bootstrap.bundle.min.js"></script>
				
					<style>
						/* Custom CSS for centering text */
						.center-text {
							text-align: center;
							padding: 20px;
						}
					</style>
				</head>
				<body>
					<!-- Svelte app container -->
					<div id="svelte-root" class="container-fluid">
						<div class="row justify-content-center">
							<div class="col-md-6 center-text">
								<h1>Hello, Svelte & Bootstrap!</h1>
								<p>This is a basic v${i} HTML template with a centered text container.</p>
							</div>
						</div>
					</div>
				
					<script>
						// Your Svelte components can be included here
					</script>
				</body>
				</html>
				`,
			};
		});
}
