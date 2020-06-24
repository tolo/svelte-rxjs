<script>
  import { Subject, combineLatest, merge } from 'rxjs';
  import { withLatestFrom } from 'rxjs/operators';

  const initialState = [];
  let subject1Values = initialState;
  let subject2Values = initialState;
  let results1 = initialState;
  let results2 = initialState;
  let results3 = initialState;

  const subject1 = new Subject();
  const subject2 = new Subject();

  subject1.subscribe(v => subject1Values = [...subject1Values, v]);
  subject2.subscribe(v => subject2Values = [...subject2Values, v]);

  const observable1 = subject1.pipe(withLatestFrom(subject2));
  const observable2 = combineLatest([subject1, subject2]);
  const observable3 = merge(subject1, subject2);

  function runExample() {
    resetExample();

    // Setup first subscription
    results1 = [...results1, "** Starting **"];
    observable1.subscribe(v => results1 = [...results1, v.join(" - ")]);
    // Setup second subscription
    results2 = [...results2, "** Starting **"];
    observable2.subscribe(v => results2 = [...results2, v.join(" - ")]);
    // Setup third subscription
    results3 = [...results3, "** Starting **"];
    observable3.subscribe(v => results3 = [...results3, v]);

    subject1.next("Hello");
    setTimeout(() => subject2.next("Góðan Daginn"), 1000);
    setTimeout(() => subject1.next("What's up?"), 2000);
    setTimeout(() => subject2.next("Hvað segiru?"), 3000);
  }
  
  function resetExample() {
    subject1Values = initialState;
    subject2Values = initialState;
	  results1 = initialState;
    results2 = initialState;
    results3 = initialState;
	}

</script>

<main>
	
	<h1>Combining Operators</h1>

  <div class="grid">
		<div class="item">
      <h2>subject1</h2>
      <ol>
		  {#each subject1Values as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2>subject1</h2>
      <ol>
		  {#each subject2Values as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
	</div>

	<div class="grid">
		<div class="item">
      <h2><a href="https://rxjs.dev/api/operators/withLatestFrom">withLatestFrom</a></h2>
      <code>subject1.withLatestFrom(subject2)</code>
      <ol>
		  {#each results1 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/api/operators/combineLatest">combineLatest</a></h2>
      <code>combineLatest([subject1, subject2])</code>
      <ol>
		  {#each results2 as item}
			  <li>{item}</li>
		  {/each}
      </ol>
		</div>
    <div class="item">
      <h2><a href="https://rxjs.dev/api/operators/merge">merge</a></h2>
      <code>merge(subject1, subject2)</code>
      <ol>
		  {#each results3 as item}
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
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
  }
  .grid .item {
    align-content: start;
  }
</style>
