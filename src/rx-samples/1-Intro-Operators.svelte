<script>
  import { from } from 'rxjs';
  import { filter, map, reduce, delay, startWith, tap } from 'rxjs/operators';

  const initialState = [];
  let valuesLeft = initialState;
  let valuesRight = initialState;

  const observable1 = from([0,1,2,3]).pipe(
    filter(e =>  e > 0 ), 
    map(e => e * 2), 
    tap(e => console.log(`Tap: ${e}`)), // The tap operator enables running side effects
    //scan((acc, one) => acc + one, 0), // Returns accumulated result on every event
    //reduce((acc, one) => acc + one, 0), // Only returns result after sequence completes
  );

  const observable2 = from([0,1,2,3]).pipe(
    delay(1000), 
    map(e => e * 2), 
    //startWith(-1), // If we need an initial value until data has "loaded"
    //reduce((acc, one) => acc + one, 0), // Only returns result after sequence completes
  );

  function runExample() {
    resetExample();
    observable1.subscribe((v) => valuesLeft = [...valuesLeft, v]);
    observable2.subscribe((v) => valuesRight = [...valuesRight, v]);
  }
  
  function resetExample() {
	  valuesLeft = initialState;
    valuesRight = initialState;
	}

</script>

<main>
	
	<h1>Intro Operators</h1>

	<div class="grid">
		<div class="item">
      <h2>Subscription 1</h2>
      <ol>
		  {#each valuesLeft as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2>Subscription 2</h2>
      <ol>
		  {#each valuesRight as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
	</div>

</main>

<footer>
  <button on:click={runExample}>Run</button>
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
    
  }
  .grid .item {
    align-content: start;
  }
</style>
