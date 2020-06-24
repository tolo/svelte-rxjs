<script>
  import { Subject } from 'rxjs';

  const initialState = [];
  let valuesLeft = initialState;
  let valuesRight = initialState;

  const subject = new Subject();

  function runExample() {
    resetExample();

    // Setup first subscription
    valuesLeft = [...valuesLeft, "** Starting **"];
    subject.subscribe((v) => valuesLeft = [...valuesLeft, v]);

    // Start adding stuff to the subject
    subject.next("Hello");
    setTimeout(() => subject.next("..."), 500);
    setTimeout(() => subject.next("Is there anybody out there?"), 1500);

    // Setup second subscription, with delay
    setTimeout(() => {
      valuesRight = [...valuesRight, "** Starting **"];
      subject.subscribe((v) => valuesRight = [...valuesRight, v]);
    }, 1000);
  }
  
  function resetExample() {
	  valuesLeft = initialState;
    valuesRight = initialState;
	}

</script>

<main>
	
	<h1>Intro Subjects</h1>

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
