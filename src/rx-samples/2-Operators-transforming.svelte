<script>
  import { onMount } from 'svelte';
  import { Observable, fromEvent, interval } from 'rxjs';
  import { debounce, throttle, tap, mergeMap, switchMap, concatMap, map, pluck, filter } from 'rxjs/operators';
  import { fromFetch } from "rxjs/fetch";

  const initialState = ["** Starting **"];
  let results1 = initialState;
  let results2 = initialState;
  let results3 = initialState;

  function makeObs(name) {
    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(`Hello ${name}`), 1000);
      setTimeout(() => subscriber.next(`What's up ${name}`), 2000);
      setTimeout(() => {
        subscriber.next(`Talk to you later ${name}`)
        subscriber.complete();
      }, 3000);
    });
  }

  function runExample() {
    resetExample();

    const input1 = document.getElementById("input1");
    const observable = fromEvent(input1, "keyup").pipe(
      map(v => input1.value), 
      filter(v => v != ""), 
      debounce(() => interval(500)), 
    );

    // Setup first subscription
    observable.pipe(
      mergeMap(makeObs), 
      //switchMap(v => fromFetch(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${v}`)), 
      //mergeMap(res => res.json()), 
      //pluck("message"), 
    )
    .subscribe(v => results1 = [...results1, v]);
    
    // Setup second subscription
    observable.pipe(
      switchMap(makeObs), 
    ).subscribe(v => results2 = [...results2, v]);

    // Setup third subscription
    observable.pipe(
      concatMap(makeObs), 
    ).subscribe(v => results3 = [...results3, v]);
  }

  onMount(async () => {
    runExample();
  });

  function resetExample() {
	  results1 = initialState;
    results2 = initialState;
    results3 = initialState;
	}
</script>

<main>
	
	<h1>Transforming Operators</h1>

  <label>
  Enter text: 
  <input id="input1"/>
  </label>
  
	<div class="grid">
		<div class="item">
      <h2><a href="https://rxjs.dev/api/operators/mergeMap">mergeMap</a></h2>
      <ol>
		  {#each results1 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/api/operators/switchMap">switchMap</a></h2>
      <ol>
		  {#each results2 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/api/operators/concatMap">concatMap</a></h2>
      <ol>
		  {#each results3 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
	</div>

</main>

<footer>
  <button on:click={resetExample}>Reset</button>
</footer>

<style>
  footer {
		margin-top: 20px;
	}

  li {
    margin: 10px 0 10px 0;
  }

  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
  }
  .grid .item {
    align-content: start;
  }
</style>
