<script>
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	// Import a simple hash based component router 
	import { 
		currentRoute, initRouting, handlerLinkClick, goToRoute, handlerBackNavigation 
	} from "./hash-router.js";
	
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

	// Pages
	const level1Pages = [
		{ title: "Promise vs Observable", path: '#PromiseVsObservable', component: PromiseVsObservable }, 
		{ title: "Hot vs Cold", path: '#HotVsCold', component: HotVsCold }, 
		{ title: "Intro to Operators", path: '#IntroOperators', component: IntroOperators }, 
		{ title: "Intro to Subjects", path: '#IntroSubjects', component: IntroSubjects }, 
		{ title: "Subscriptions", path: '#Subscriptions', component: Subscriptions }, 
	];
	const level2Pages = [
		{ title: "Filtering Operators", path: '#OperatorsFiltering', component: OperatorsFiltering }, 
		{ title: "Combining Operators", path: '#OperatorsCombining', component: OperatorsCombining }, 
		{ title: "Multicast", path: '#Multicast', component: Multicast }, 
		{ title: "Transforming Operators", path: '#OperatorsTransforming', component: OperatorsTransforming }, 
		{ title: "Subjects", path: '#Subjects', component: Subjects }, 
	];

	// Set up path (hash) to component mapping
	let routes = {};
	level1Pages.forEach((e) => routes[e.path] = e.component);
	level2Pages.forEach((e) => routes[e.path] = e.component);

	onMount(() => {
  	initRouting();
	});
	
	</script>

<svelte:window on:popstate={handlerBackNavigation}/>

<main>

	<img class="rxjsLogo" alt="RxJS Logo" 
		on:click={() => goToRoute()} 
		src="https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png" width="64" height="64"/>
	
	{#if routes[$currentRoute] == null}
	<h1>Svelte + RxJS</h1>
	
  <header>
    <h2>Part 1 - Intro</h2>
		
		{#each level1Pages as item}
			<h3>
				<a href={item.path} on:click|preventDefault={handlerLinkClick}>{item.title}</a>
			</h3>
		{/each}
		&nbsp;

    <h2>Part 2 - A little deeper dive</h2>
		{#each level2Pages as item}
			<h3>
				<a href={item.path} on:click|preventDefault={handlerLinkClick}>{item.title}</a>
			</h3>
		{/each}
  </header>
	
	{:else}
	<!-- Note the use of $ to enable automatic unsubscribing from Observables by Svelte -->
	<svelte:component this={routes[$currentRoute]} />
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
