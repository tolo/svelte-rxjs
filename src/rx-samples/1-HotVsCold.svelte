<script>
  import { Observable, Subscription } from 'rxjs';
  import { publish } from 'rxjs/operators';

  let idCounter = 1;
  const initialState = [];
  let valuesLeft = initialState;
  let valuesRight = initialState;
  let observableMessages = [];
  let subscription;

  // Create a custom cold observable
  let observable = new Observable(subscriber => {
    const id = idCounter++;
    observableMessages = [...observableMessages, `** BEGIN OBSERVABLE ${id} **`];
    setTimeout(() => subscriber.next(`Hello ${id}`), 1000);
    setTimeout(() => subscriber.next("..."), 2000);
    setTimeout(() => {
       subscriber.next("Is there anybody out there?");
       subscriber.complete();
    }, 3000);
    return () => { observableMessages = [...observableMessages, `** UNSUBSCRIBED OBSERVABLE ${id} **`]; }
  });

  let hotObservable = observable.pipe(publish()); // Convert into HOT (and multicast) observable by "publishing it"

  function runColdExample() {
    runExample(observable);
  }

  function runHotExample() {
    runExample(hotObservable);

    setTimeout(() => {
       observableMessages = [...observableMessages, `** CONNECTING HOT OBSERVABLE **`];
       hotObservable.connect();
    }, 1000);
  }

  function runExample(o) {
    valuesLeft = [...valuesLeft, "** Running **"];
    valuesRight = [...valuesRight, "** Running **"];

    const s1 = o.subscribe((v) => valuesLeft = [...valuesLeft, v]);
    const s2 = o.subscribe((v) => valuesRight = [...valuesRight, v]);
    subscription = new Subscription();
    subscription.add(s1);
    subscription.add(s2);
  }
  
  function resetExample() {
    if (subscription) subscription.unsubscribe();
    subscription = null;
	  valuesLeft = initialState;
    valuesRight = initialState;
    observableMessages = [];
	}

</script>

<main>
	
	<h1>Intro Subscriptions</h1>

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
  <h2>Messages from observables</h2>
  <ol>
  {#each observableMessages as item}
    <li>{item}</li>
  {/each}
  </ol>
</footer>

<footer>
  <button on:click={runColdExample}>Run cold</button>
  <button on:click={runHotExample}>Run hot</button>
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
