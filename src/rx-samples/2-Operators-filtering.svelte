<script>
  import { onMount } from 'svelte';
  import { fromEvent, interval } from 'rxjs';
  import { debounce, throttle, tap, scan, map } from 'rxjs/operators';

  const initialState = ["** Starting **"];
  let valuesLeft = initialState;
  let valuesRight = initialState;

  function runExample() {
    resetExample();

    const input1 = document.getElementById("input1");
    const observable = fromEvent(input1, "keyup").pipe(
      map(v => input1.value), 
    );

    // Setup first subscription
    observable.pipe(
      throttle(() => interval(500)), 
    )
    .subscribe(v => valuesLeft = [...valuesLeft, v]);
    
    // Setup second subscription
    observable.pipe(
      debounce(() => interval(500)), 
    ).subscribe(v => valuesRight = [...valuesRight, v]);
  }

  onMount(async () => {
    runExample();
  });

  function resetExample() {
	  valuesLeft = initialState;
    valuesRight = initialState;
	}
</script>

<main>
	
	<h1>Filtering Operators</h1>

  <label>
  Enter text: 
  <input id="input1"/>
  </label>
  
	<div class="grid">
		<div class="item">
      <h2><a href="https://rxjs.dev/api/operators/throttle">throttle</a></h2>
      <ol>
		  {#each valuesLeft as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/api/operators/debounce">debounce</a></h2>
      <ol>
		  {#each valuesRight as item}
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
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
  }
  .grid .item {
    align-content: start;
  }
</style>
