<script>
  import { Observable } from 'rxjs';
  import { filter, map, reduce } from 'rxjs/operators';

  const initialState = [];
  let result = initialState;
  let subscription;

  const observable = new Observable(subscriber => {
    setTimeout(() => subscriber.next("Hello"), 1000);
    setTimeout(() => subscriber.next("..."), 2000);
    setTimeout(() => {
       subscriber.next("Is there anybody out there?");
       subscriber.complete(); // TODO: Complete the sequence and see what happens
    }, 3000);
    return () => { result = [...result, "** UNSUBSCRIBED **"]; }
  });

  function runExample() {
    resetExample();
    subscription = observable.subscribe((v) => result = [...result, v]);
    //setTimeout(() => subscription.unsubscribe(), 2500); // TODO: Make sure you cancel the subscription
  }
  
  function resetExample() {
    // NOTE: Svelte also has built in support for unsubscribing fron subscriptions
    if (subscription) subscription.unsubscribe();
	  result = initialState;
	}

</script>

<main>
	
	<h1>Intro Subscriptions</h1>

	<div class="grid">
		<div class="item">
      <h2>Result</h2>
      <ol>
		  {#each result as item}
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
    grid-template-columns: 1fr;
    
  }
  .grid .item {
    align-content: start;
  }
</style>
