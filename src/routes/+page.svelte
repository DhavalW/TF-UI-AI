<!-- @format -->

<script>
	import {treeStore} from "../stores/treestore";
	import {selectionStore} from "../stores/selectionStore";
	import {settingsStore} from "../stores/settingsStore";
	import Progress from "./progress.svelte";

	import {openAI} from "$lib/openAI";

	const getBlobURL = (code, type) => {
		const blob = new Blob([code], {type});
		return URL.createObjectURL(blob);
	};

	const selectItem = ({versionTag}) => {
		console.log("selecting item - ", versionTag);
		selectionStore.update((d) => Object.assign({}, d, {versionTag}));
		selectionStore.save();
	};

	const updateSettings = (key, value) => {
		console.log("updateSettings - ", key, value);
		settingsStore.update((d) => {
			d[key] = value;
			return d;
		});
		settingsStore.save();
	};

	let isProcessing = false;

	const promptKeyPress = (e) => {
		// console.log("kp evt - ", e);
		if (e.key === "Enter" || e.keyCode === 13) {
			console.log("processing API request...");
			isProcessing = true;

			if (!$treeStore || $treeStore.length === 0) {
				isProcessing = false;
				throw Error("treeStore cannot be empty while prompting");
				return;
			}

			if (
				!$selectionStore ||
				$selectionStore.versionTag < 0 ||
				typeof $selectionStore.versionTag !== "number"
			) {
				// console.log("selectionStore - ", $selectionStore);
				isProcessing = false;
				alert("Please select a version first");
				return;
			}

			if (!$settingsStore || !$settingsStore.openAIKey) {
				isProcessing = false;
				alert("Please add a valid OpenAI API key first");
			}

			var treeItem = $treeStore.find(
				(x) => x.versionTag === $selectionStore.versionTag
			);

			if (!treeItem) {
				isProcessing = false;
				alert(
					"Version data is stale. Please select a version first..."
				);
				return;
			}

			openAI(treeItem.html, e.target.value, $settingsStore.openAIKey)
				.then((response) => {
					console.log("open ai response - ", response);

					if (response && response.choices) {
						let output = response.choices[0];
						if (output && output.finish_reason === "stop") {
							// TODO - validate HTML content
							let html = output.message.content;

							let newV = treeStore.push({
								prevVersion: treeItem.versionTag,
								html,
								prompt: e.target.value,
							});

							if (newV) {
								selectItem({versionTag: newV});
							}

							treeStore.save();
						}
					}

					e.target.value = "";
				})
				.catch((e) => {
					console.error(e);
					alert(
						"Something went wrong with the API call. Please try again or contact support."
					);
				})
				.then(() => (isProcessing = false));
		}
	};
</script>

<div class="row">
	<div class="column centered p1">
		<h1 class="m0 p0">Welcome to ThoughtForma</h1>
	</div>
</div>

<div class="row">
	<div class="column column-75 p1 centered">
		<div class="row">
			<div class="column left p1 flex" style="align-items:center;">
				<input
					class="m0"
					placeholder="Type instruction prompt..."
					on:keypress={promptKeyPress}
				/>
				<div class="p1" style="position:absolute; right:0;">
					<Progress
						style="padding-right:1em;color:lightblue;font-weight:bold;"
						isInProgress={isProcessing}
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column left p1">
				{#if $selectionStore && $selectionStore.versionTag >= 0}
					{@const treeItem = $treeStore.find(
						(x) => x.versionTag === $selectionStore.versionTag
					)}
					{#if treeItem}
						{@const blobUrl = getBlobURL(
							treeItem.html,
							"text/html"
						)}
						<div class="preview shadow rounded">
							<iframe src={blobUrl} />
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
	<div class="column centered bordered p0" style="width:1px;" />
	<div class="column column-25 p1 left scroll">
		<div class="row">
			<div class="column">
				<details>
					<summary><b>Settings</b></summary>
					<div class="p1">
						<small><h6><b>OpenAI Token</b></h6></small>
						<input
							placeholder="Enter OpenAI API token"
							type="password"
							value={$settingsStore["openAIKey"] || ""}
							on:change={(e) =>
								updateSettings("openAIKey", e.target.value)}
						/>
					</div>
				</details>
			</div>
		</div>
		<div class="row">
			<div class="column">
				{#each $treeStore as treeItem}
					{@const blobUrl = getBlobURL(
						treeItem.html ||
							'<p style="text-align:center; width:100%;">NAe</p>',
						"text/html"
					)}
					<div
						class="version-item shadow bordered rounded selected"
						class:selected={$selectionStore &&
							$selectionStore.versionTag === treeItem.versionTag}
						on:click={selectItem(treeItem)}
					>
						<div class="overlay p0-25">
							<span class="text"
								>v{treeItem.versionTag >= 0
									? treeItem.versionTag
									: "notag"}</span
							>
						</div>
						<iframe class="scaled-frame" src={blobUrl} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<style>
	div {
		position: relative;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
	}

	.flex {
		display: flex;
	}

	.p0-25 {
		padding: 0.25em;
	}
	.p0 {
		padding: 0;
	}
	.m0 {
		margin: 0;
	}
	.p1 {
		padding: 1em;
	}
	.centered {
		text-align: center;
		align-items: center;
	}
	.left {
		text-align: left;
		align-items: left;
	}
	.bordered {
		/* border: solid 1px lightblue; */
		border: solid 1px gainsboro;
	}

	.scroll {
		overflow: scroll;
		height: 100%;
		max-height: 100vh;
	}

	.shadow {
		/* box-shadow: 5px 5px 5px 5px lightblue; */
		box-shadow: 5px 5px 15px -5px gainsboro;
	}

	.rounded {
		border-radius: 5px;
	}

	iframe {
		border: none;
		width: 100%;
		height: 100%;
	}

	.version-item {
		position: relative;
		width: 100%;
		height: 10em;
		margin: 1em 0;
		border: solid 3px gainsboro;
		transition: 0.2s;
	}
	.version-item:hover {
		transform: scale(1.02);
	}

	.selected {
		/* border: solid 3px lightblue; */
		border-color: lightblue;
	}

	.version-item iframe {
		width: 100%;
		margin: 0;

		/* --scale: 0.5;
		zoom: var(--scale);
		transform: scale(var(--scale));
		transform-origin: 0 0;
		-ms-zoom: var(--scale);
		-moz-transform: scale(var(--scale));
		-moz-transform-origin: 0 0;
		-o-transform: scale(var(--scale));
		-o-transform-origin: 0 0;
		-webkit-transform: scale(var(--scale));
		-webkit-transform-origin: 0 0; */
	}
	.version-item .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.version-item .overlay .text {
		background: rgba(0, 0, 0, 0.8);
		padding: 0.2em 0.5em;
		color: white;
		font-weight: bold;
		border-radius: 5px;
	}
	.preview {
		width: 100%;
		height: 50vh;
	}

	.scaled-frame {
		scale: 0.7;
		overflow: hidden;
	}

	/* .version-item .wrap {
		width: auto;
		height: auto;
		padding: 0;
		margin: auto;
		overflow: hidden;
	} */
	/* .scaled-frame {
		width: 1024px;
		height: 768px;
		border: 0px;
	} */
	/* .scaled-frame {
		zoom: 0.75;
		-moz-transform: scale(0.75);
		-moz-transform-origin: 0 0;
		-o-transform: scale(0.75);
		-o-transform-origin: 0 0;
		-webkit-transform: scale(0.75);
		-webkit-transform-origin: 0 0;
	}
	@media screen and (-webkit-min-device-pixel-ratio: 0) {
		.scaled-frame {
			zoom: 1;
		}
	} */
</style>
