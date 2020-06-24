<script>
	import { fade } from 'svelte/transition';
	
	import PromiseVsObservable from "./rx-samples/1-PromiseVsObservable.svelte";
	import HotVsCold from "./rx-samples/1-HotVsCold.svelte";
	import IntroOperators from "./rx-samples/1-Intro-Operators.svelte";
	import IntroSubjects from "./rx-samples/1-Intro-Subjects.svelte";
	import Subscriptions from "./rx-samples/1-Subscriptions.svelte";

	import OperatorsFiltering from "./rx-samples/2-Operators-filtering.svelte";
	import OperatorsCombining from "./rx-samples/2-Operators-combining.svelte";
	import Multicast from "./rx-samples/2-Multicast.svelte";
	import OperatorsTransforming from "./rx-samples/2-Operators-transforming.svelte";
	import Subjects from "./rx-samples/2-Subjects.svelte";

	const level1Pages = [
		{ title: "Promise vs Observable", component: PromiseVsObservable }, 
		{ title: "Hot vs Cold", component: HotVsCold }, 
		{ title: "Intro to Operators", component: IntroOperators }, 
		{ title: "Intro to Subjects", component: IntroSubjects }, 
		{ title: "Subscriptions", component: Subscriptions }, 
	];

	const level2Pages = [
		{ title: "Filtering Operators", component: OperatorsFiltering }, 
		{ title: "Combining Operators", component: OperatorsCombining }, 
		{ title: "Multicast", component: Multicast }, 
		{ title: "Transforming Operators", component: OperatorsTransforming }, 
		{ title: "Subjects", component: Subjects }, 
	];

	let selected;
</script>

<main>

	<img class="rxjsLogo" alt="RxJS Logo" 
		on:click={() => selected = null} 
		src="https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png" width="64" height="64"/>
	
	{#if selected == null}
	<h1>Svelte + RxJS</h1>

  <header>
    <h2>Part 1 - Intro</h2>
		{#each level1Pages as item}
			<h3 on:click={() => selected = item.component}>{item.title}</h3>
		{/each}
		&nbsp;

    <h2>Part 2 - A little deeper dive</h2>
		{#each level2Pages as item}
			<h3 on:click={() => selected = item.component}>{item.title}</h3>
		{/each}
  </header>
	
	{:else}
	<svelte:component this={selected}/>	 
	{/if}
	

</main>

<style>
	header {
		text-align: center;
		margin-top: 44px;
	}

	header h3 {
		cursor: pointer;
		text-decoration: underline;
	}

	.rxjsLogo {
		cursor: pointer;
		border-radius: 50%;
		background-color: white;
		position: absolute;
		left: 10px;
		top: 10px;
	}
</style>
